import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button, Spin, Alert, Menu } from 'antd';
import { BusinessCard } from './components/BusinessCard';
import { IMaskRequest, MaskType, MASK_TYPE } from '../../types';
import {
  BusinessFilterVertical,
  BusinessFilterHorizontal
} from './components/BusinessFilter';
import { useWindowSize } from '../../globalHooks';
import InfiniteScroll from 'react-infinite-scroller';

import './Masks.scss';

const { Header, Content } = Layout;
const { Title } = Typography;
const { SubMenu } = Menu;

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
    </>
  ) : (
    <Col md={16} sm={18} xs={24}>
      <BusinessFilterHorizontal
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
    <div>
      <Header className="header-fixed">
        <Row justify="center">
          <Col xl={14} lg={18} md={20} sm={22} xs={24}>
            <Title level={3}>Midwest Helps</Title>
            <div className="right-nav">
              <Menu mode="horizontal">
                <SubMenu title="Resources">
                  <Menu.ItemGroup>
                    <Menu.Item key="setting:1">
                      <Button
                        onClick={() => history.push('/masks')}
                        type="link"
                        className="nav-link"
                      >
                        Masks
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="setting:1">
                      <Button
                        onClick={() => history.push('/covid19')}
                        type="link"
                        className="nav-link"
                      >
                        Covid-19
                      </Button>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                      <Button
                        onClick={() => history.push('/contact')}
                        type="link"
                        className="nav-link"
                      >
                        Contact
                      </Button>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu>
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="header-greeting">
        <Row justify="center">
          <Col xl={14} lg={17} md={16} sm={18} xs={22}>
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
            <br />
            <Button onClick={() => history.push('/list')} type="primary">
              List a business
            </Button>
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
