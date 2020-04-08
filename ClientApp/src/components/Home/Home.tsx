import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button, Spin, Alert } from 'antd';
import { BusinessCard } from '../BusinessCard';
import { Business, BUSINESS_CATEGORY_STRINGS } from '../../types';
import {
  BusinessFilterVertical,
  BusinessFilterHorizontal,
} from '../BusinessFilter';
import { useWindowSize } from '../../globalHooks';
import { BusinessSearch } from '../BusinessSearch';
import InfiniteScroll from 'react-infinite-scroller';

import './Home.scss';

const { Header, Content } = Layout;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

const parseUrl = (query: URLSearchParams) => {
  let filterQuery = parseInt(query.get('businesstype') || '-1');
  if (
    filterQuery < -1 ||
    filterQuery >= Object.entries(BUSINESS_CATEGORY_STRINGS).length ||
    isNaN(filterQuery)
  ) {
    filterQuery = -1;
  }
  let searchQuery = query.get('name') || '';

  return {
    filterQuery,
    searchQuery,
  };
};

const createParamString = (filter: number, search: string) => {
  const filterParam = filter >= 0 ? `businesstype=${filter}` : '';
  const searchParam = search ? `name=${search}` : '';

  let paramString = '';
  if (filterParam || searchParam) {
    paramString += '?';
  }
  if (filterParam) {
    paramString += filterParam;
    if (searchParam) {
      paramString += '&';
    }
  }
  if (searchParam) {
    paramString += searchParam;
  }

  return paramString;
};

export const Home: React.FC = () => {
  const history = useHistory();
  const query = useQuery();

  // local state
  const [allBusiness, setAllBusiness] = useState<Business[]>([]);
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
      searchText: searchQuery,
    });
  }, []);

  // Updating params
  useEffect(() => {
    const paramString = createParamString(params.filter, params.searchText);

    setLoading(true);
    setHasMoreBusinesses(true);
    fetchUrl(`/api/listing/page/1${paramString}`)
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
    const paramString = createParamString(params.filter, params.searchText);

    fetchUrl(`/api/listing/page/${pageNum}${paramString}`)
      .then((data) => {
        setAllBusiness([...allBusiness, ...data]);
        setError(false);
        if (data.length < 10) {
          setHasMoreBusinesses(false);
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  let companies;
  let loader = (
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
        {allBusiness.map((business) => (
          <BusinessCard {...business} key={business.id} />
        ))}
      </InfiniteScroll>
    );
  }

  const companiesGroup = isLargeWindowSize ? (
    <>
      <Col xl={4} lg={5}>
        <BusinessFilterVertical
          filter={params.filter}
          setFilter={(filter) => setParams({ ...params, filter })}
        />
      </Col>
      <Col xl={10} lg={12}>
        <BusinessSearch
          searchText={params.searchText}
          setSearchText={(searchText) => setParams({ ...params, searchText })}
        />
        {companies}
      </Col>
    </>
  ) : (
    <Col md={16} sm={18} xs={24}>
      <BusinessSearch
        searchText={params.searchText}
        setSearchText={(searchText) => setParams({ ...params, searchText })}
        filterComponent={
          <BusinessFilterHorizontal
            filter={params.filter}
            setFilter={(filter) => setParams({ ...params, filter })}
          />
        }
      />
      {companies}
    </Col>
  );

  return (
    <div>
      <Header className="header-fixed">
        <Row justify="center">
          <Col xl={18} lg={18} md={20} sm={22} xs={24}>
            <Title level={3}>Hotdish</Title>
            <div className="right-nav">
              <Button
                onClick={() => history.push('/contact')}
                type="link"
                className="nav-link"
              >
                Contact
              </Button>
              <Button onClick={() => history.push('/list')} type="primary">
                List a business
              </Button>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="header-greeting">
        <Row justify="center">
          <Col xl={16} lg={16} md={18} sm={20} xs={22}>
            <Title level={1}>
              Dishin' out hot updates for businesses in Fargo
            </Title>
            <Typography>
              The temporary shut down of Fargo/Moorhead businesses due to
              COVID-19 has many folks struggling. This site is meant to be a
              resource for the people of this city to dish up on the latest info
              and continue to support their favorite local spots.
            </Typography>
            <br />
            <Typography>
              This information is crowdsourced, so please verify the accuracy
              independently. If you see a mistake or need to update a post,
              please contact us.
            </Typography>
          </Col>
        </Row>
      </Content>
      <Content className="company-content">
        <Row justify="center" gutter={8} style={{ margin: '0' }}>
          {companiesGroup}
        </Row>
      </Content>
    </div>
  );
};
