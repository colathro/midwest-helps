﻿import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Layout,
  Button,
  Spin,
  Alert,
  Menu,
  Skeleton,
} from "antd";
import { MaskRequestCard } from "./components/MaskRequestCard";
import { Aggregates } from "./components/Aggregates";
import { NavBar } from "../NavBar";
import { IMaskRequest, MASK_TYPE } from "../../types";
import { useWindowSize } from "../../globalHooks";
import InfiniteScroll from "react-infinite-scroller";

import "./Masks.scss";
import {
  MaskRequestFilterVertical,
  MaskRequestFilterHorizontal,
} from "./components/MaskRequestFilter";
import { FolksLinker } from "../Folks/components/FolksLinker";

const { Header, Content } = Layout;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

const parseUrl = (query: URLSearchParams) => {
  let filterQuery = parseInt(query.get("businesstype") || "-1", 10);
  if (
    filterQuery < -1 ||
    filterQuery >= Object.entries(MASK_TYPE).length ||
    isNaN(filterQuery)
  ) {
    filterQuery = -1;
  }
  const searchQuery = query.get("name") || "";

  return {
    filterQuery,
    searchQuery,
  };
};

const createParamString = (filter: number) => {
  const filterParam = filter >= 0 ? `masktype=${filter}` : "";

  let paramString = "";
  if (filterParam) {
    paramString += "?";
    paramString += filterParam;
  }

  return paramString;
};

export const Masks: React.FC = () => {
  const history = useHistory();
  const query = useQuery();

  // local state
  const [allBusiness, setAllBusiness] = useState<IMaskRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [params, setParams] = useState({ filter: -1, searchText: "" });
  const [hasMoreBusinesses, setHasMoreBusinesses] = useState(true);
  const windowSize = useWindowSize();

  const isLargeWindowSize = windowSize?.width && windowSize.width >= 992;

  const gotoHome = () => {
    history.push("/");
    window.location.reload(false);
  };

  const goFolks = () => {
    history.push("/folks");
  };

  useEffect(() => {
    const { filterQuery, searchQuery } = parseUrl(query);
    setParams({
      filter: filterQuery,
      searchText: searchQuery,
    });
  }, []);

  // Updating params
  useEffect(() => {
    const paramString = createParamString(params.filter);

    setLoading(true);
    setHasMoreBusinesses(true);
    fetchUrl(`/api/maskrequest/page/1${paramString}`)
      .then((data) => {
        setAllBusiness(data);
        setLoading(false);
        setError(false);
        if (data.length < 10) {
          setHasMoreBusinesses(false);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });

    history.push(`/${paramString}`);
  }, [params]);

  const fetchUrl = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
  };

  const loadMore = (pageNum: number) => {
    const paramString = createParamString(params.filter);

    fetchUrl(`/api/maskrequest/page/${pageNum}${paramString}`)
      .then((data) => {
        setAllBusiness([...allBusiness, ...data]);
        setError(false);
        if (data.length < 10) {
          setHasMoreBusinesses(false);
        }
      })
      .catch(() => setError(true));
  };

  let companies;

  const loader = <Skeleton active className="loader" />;

  if (loading) {
    companies = loader;
  } else if (error) {
    companies = (
      <Alert
        message="Something went wrong"
        description="There was an error loading the page. Refresh the browser and try it again. If the error persists, contact the admin."
        type="error"
      />
    );
  } else {
    companies = (
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMoreBusinesses}
        loader={loader}
      >
        {allBusiness.map((maskRequest) => (
          <MaskRequestCard {...maskRequest} key={maskRequest.id} />
        ))}
      </InfiniteScroll>
    );
  }

  const companiesGroup = isLargeWindowSize ? (
    <>
      <Col xl={4} lg={5}>
        <MaskRequestFilterVertical
          filter={params.filter}
          setFilter={(filter) => setParams({ ...params, filter })}
        />
      </Col>
      <Col xl={16} lg={17} offset={2}>
        {companies}
      </Col>
    </>
  ) : (
    <Col md={16} sm={18} xs={24}>
      <MaskRequestFilterHorizontal
        filter={params.filter}
        setFilter={(filter) => setParams({ ...params, filter })}
      />
      {companies}
    </Col>
  );

  return (
    <NavBar>
      <Row justify="center">
        <div className="background-people">
          <img className="woman" src="/images/avatars/doctor-woman.svg"></img>
          <img className="man" src="/images/avatars/doctor-man.svg"></img>
        </div>
        <Col>
          <Content className="header-greeting">
            <Title level={2}>Protective Equipment Bulletin</Title>
            <Typography>
              Midwest Helps is focused on providing a bulletin board for
              businesses and organizations to get connected to awesome makers.
              Please check out our about page for resources and more
              information!
              <br />
              <Aggregates></Aggregates>
            </Typography>
            <br />
            <span>
              <Button
                onClick={() => history.push("/maskrequest")}
                type="primary"
              >
                Request masks
              </Button>
            </span>
          </Content>
          <Content className="company-content">
            <Row>{companiesGroup}</Row>
          </Content>
          <FolksLinker />
        </Col>
      </Row>
    </NavBar>
  );
};
