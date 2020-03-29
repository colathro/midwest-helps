import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button } from 'antd';
import { CompanyCard } from '../CompanyCard';

import './Home.scss';
import { getFakeCompanies } from '../../dataFaking';

const { Header, Content } = Layout;
const { Title } = Typography;

export const Home: React.FC = () => {
  let history = useHistory();

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
        <Row>
          <Col span={18} offset={3}>
            <Title className="header-title" level={3}>
              Hotdish
            </Title>
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
          <Col span={18}>
            <Title level={1}>
              Support your community from where you're at.
            </Title>
            <Typography>
              The temporary shut down of Fargo/Moorhead businesses due to
              COVID-19 has many folks struggling. This site is meant to be a
              resource for the people of this city to dish up on the latest info
              and continue to support their favorite local spots.
            </Typography>
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
          <Col span={12}>
            {getFakeCompanies(10).map((companyProps, index) => (
              <CompanyCard {...companyProps} key={index} />
            ))}
          </Col>
        </Row>
      </Content>
    </div>
  );
};
