/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Typography, Layout, Button } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const Home: React.FC = () => {
  let history = useHistory();

  const gotoContact = () => {
    history.push('/contact');
  };
  const gotoList = () => {
    history.push('/list');
  };

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
            <Content className="content-layout">
              <Title level={1}>
                Support your community from where you're at.
              </Title>
              <Typography>
                The temporary shut down of Fargo/Moorhead businesses due to
                COVID-19 has many folks struggling. This site is meant to be a
                resource for the people of this city to dish up on the latest
                info and continue to support their favorite local spots.
              </Typography>
              <Typography>
                This information is crowdsourced, so please verify the accuracy
                independently. If you see a mistake or need to update a post,
                please contact us.
              </Typography>
            </Content>
          </Col>
        </Row>
      </Content>
      <Content>
        <Row justify="center">
          <Col
            span={24}
            style={{ height: '2000px' }} // TEMPORARY
          ></Col>
        </Row>
      </Content>
      <Footer>
        <Row justify="center">
          <Col span={18}>
            🧡 Made by Jordan, Michael, Tyler, Josie, Daniel, Louie, and Colton
            💌 Hello@getthehotdish.com
          </Col>
        </Row>
      </Footer>
    </div>
  );
};
