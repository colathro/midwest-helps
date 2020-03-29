import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button } from 'antd';
import { CompanyCard } from '../CompanyCard';
import { CompanyFilters } from '../CompanyFilters';
import { CompanyCategory } from '../CompanyCard/CompanyCard';

import { getFakeCompanies } from '../../dataFaking';

import './Home.scss';

const { Header, Content } = Layout;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

export const Home: React.FC = () => {
  let history = useHistory();
  let query = useQuery();
  let filter = query.get('filter') as CompanyCategory;

  const gotoContact = () => {
    history.push('/contact');
  };
  const gotoList = () => {
    history.push('/list');
  };

  fetch('/api/listing/page/1')
    .then(response => response.json())
    .then(data => console.log('RESPONSE', data));

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
              Support your community from where you're at.
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
        <Row justify="center">
          <Col xl={12} lg={14} md={16} sm={18} xs={24}>
            <CompanyFilters filter={filter} />
            {getFakeCompanies(10).map((companyProps, index) => (
              <CompanyCard {...companyProps} key={index} />
            ))}
          </Col>
        </Row>
      </Content>
    </div>
  );
};
