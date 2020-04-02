import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button, Spin, Alert, Input } from 'antd';
import { BusinessCard } from '../BusinessCard';
import { Business } from '../../types';

import './Home.scss';

const { Search } = Input;
const { Header, Content } = Layout;
const { Title } = Typography;

export const Home: React.FC = () => {
  let history = useHistory();

  const [allBusiness, setAllBusiness] = useState<Business[]>([]);
  const [businesslist, setBusinesslist] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUrl('/api/listing/page/1');
  }, []);

  async function fetchUrl(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setAllBusiness(data);
      setBusinesslist(data);
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  }

  const onSearch = (value: string) => {
    if (value) {
      setBusinesslist(
        allBusiness.filter(business =>
          business.name.toLowerCase().includes(value)
        )
      );
    } else {
      setBusinesslist(allBusiness);
    }
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
    companies = (
      <Col xl={12} lg={14} md={16} sm={18} xs={24}>
        <Search
          placeholder="Search for a business"
          onSearch={value => onSearch(value)}
          enterButton
          className="business-search"
        />
        {businesslist.map(business => (
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
      <Content>
        <Row justify="center">{companies}</Row>
      </Content>
    </div>
  );
};
