import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button, Spin, Alert, Input } from 'antd';
import { BusinessCard } from '../BusinessCard';
import { Business, BUSINESS_CATEGORY_STRINGS } from '../../types';
import {
  BusinessFilterVertical,
  BusinessFilterHorizontal
} from '../BusinessFilter';

import './Home.scss';
import { useWindowSize } from './HomeHooks';

const { Header, Content } = Layout;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

export const Home: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  let filter = parseInt(query.get('businesstype') || '-1');
  if (
    filter < -1 ||
    filter >= Object.entries(BUSINESS_CATEGORY_STRINGS).length
  ) {
    filter = -1;
  }

  const [allBusiness, setAllBusiness] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const windowSize = useWindowSize();
  const isLargeWindowSize = windowSize?.width && windowSize.width >= 992;

  useEffect(() => {
    const filterParam = filter >= 0 ? `?businesstype=${filter}` : '';
    fetchUrl(`/api/listing/page/1${filterParam}`);
  }, [filter]);

  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setAllBusiness(data);
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const onSearch = (value: string) => {
    // TODO: search
  };

  const gotoContact = () => {
    history.push('/contact');
  };
  const gotoList = () => {
    history.push('/list');
  };

  let companies;
  if (loading) {
    companies = (
      <Spin className="companies-loading" size="large" tip="Loading..." />
    );
  } else if (error) {
    companies = (
      <Alert
        message="Something went wrong"
        description="There was an error loading the page. Refresh the browser and try it again. If the error persists, contact the admin."
        type="error"
      />
    );
  } else {
    companies = isLargeWindowSize ? (
      <>
        <Col xl={4} lg={5}>
          <BusinessFilterVertical filter={filter} />
        </Col>
        <Col xl={10} lg={12}>
          {allBusiness.map(business => (
            <BusinessCard {...business} key={business.id} />
          ))}
        </Col>
      </>
    ) : (
      <Col md={16} sm={18} xs={24}>
        <BusinessFilterHorizontal filter={filter} />
        {allBusiness.map(business => (
          <BusinessCard {...business} key={business.id} />
        ))}
      </Col>
    );
  }

  return (
    <div>
      <Header className="header-fixed">
        <Row justify="center">
          <Col xl={18} lg={18} md={20} sm={22} xs={24}>
            <Title level={3}>Hotdish</Title>
            <div className="right-nav">
              <Button onClick={gotoContact} type="link" className="nav-link">
                Contact
              </Button>
              <Button onClick={gotoList} type="primary">
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
        <Row justify="center" gutter={8}>
          <div id="top-of-companies" />
          {companies}
        </Row>
      </Content>
    </div>
  );
};
