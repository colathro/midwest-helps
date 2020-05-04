import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button, Spin, Alert, Menu } from 'antd';
import { MaskRequestCard } from './components/MaskRequestCard';
import { IMaskRequest, MASK_TYPE } from '../../types';
import { useWindowSize } from '../../globalHooks';
import InfiniteScroll from 'react-infinite-scroller';

import './Masks.scss';
import {
  MaskRequestFilterVertical,
  MaskRequestFilterHorizontal
} from './components/MaskRequestFilter';

const { Header, Content } = Layout;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

const parseUrl = (query: URLSearchParams) => {
  let filterQuery = parseInt(query.get('businesstype') || '-1', 10);
  if (
    filterQuery < -1 ||
    filterQuery >= Object.entries(MASK_TYPE).length ||
    isNaN(filterQuery)
  ) {
    filterQuery = -1;
  }
  const searchQuery = query.get('name') || '';

  return {
    filterQuery,
    searchQuery
  };
};

const createParamString = (filter: number) => {
  const filterParam = filter >= 0 ? `masktype=${filter}` : '';

  let paramString = '';
  if (filterParam) {
    paramString += '?';
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
  const [params, setParams] = useState({ filter: -1, searchText: '' });
  const [hasMoreBusinesses, setHasMoreBusinesses] = useState(true);
  const windowSize = useWindowSize();

  const isLargeWindowSize = windowSize?.width && windowSize.width >= 992;

  useEffect(() => {
    const { filterQuery, searchQuery } = parseUrl(query);
    setParams({
      filter: filterQuery,
      searchText: searchQuery
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

  const loader = (
    <Spin className="companies-loading" size="large" tip="Loading..." />
  );

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

  /*   <Button
  onClick={() => history.push('/masks')}
  type="link"
  className="nav-link"
>
  Masks
</Button> */

  return (
    <Row justify="center">
      <div className="background-people">
        <img className="woman" src="/images/avatars/doctor-woman.svg"></img>
        <img className="man" src="/images/avatars/doctor-man.svg"></img>
      </div>
      <Col xl={14} lg={18} md={20} sm={22} xs={24}>
        <Header className="header-fixed">
          <Title level={4}>Midwest Helps</Title>
          <div className="right-nav">
            <Button
              onClick={() => history.push('/contact')}
              type="link"
              className="nav-link"
            >
              About
            </Button>
            <Button
              onClick={() => history.push('/contact')}
              type="link"
              className="nav-link"
            >
              Contact
            </Button>
          </div>
        </Header>
        <Content className="header-greeting">
          <Title level={1}>In need of masks</Title>
          <Typography>
            Donate masks to local business who face shortages while doing
            essential work.
          </Typography>
          <br />
          <Button onClick={() => history.push('/maskrequest')} type="primary">
            Request masks
          </Button>
        </Content>
        <Content className="company-content">
          <Row>{companiesGroup}</Row>
        </Content>
      </Col>
    </Row>
  );
};
