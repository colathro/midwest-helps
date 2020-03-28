import React from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import './App.scss';

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => (
  <Layout>
    <Header className="header-layout">
      <Title className="header-title" level={3}>Hotdish</Title>
    </Header>
    <Content className="content-layout">
      <Layout className="layout-purple-background">
        <Title className="title">Dishin' out hot updates for business in the United States</Title>
        <Title className="title" level={4}>
          The temporary shut down of US businesses due to COVID-19 has many folks struggling.
          This site is meant to be a resource for people to dish up on the latest info and continue to support their favorite local spots.
          This information is crowdsourced, so please verify the accuracy independently. If you see a mistake or need to update a post, please contact us.
        </Title>
      </Layout>
    </Content>
    <Content className="content-layout-main">
      <Layout className="layout-white-background">
        <Content className="content-home">
          <Route exact path='/' component={Home} />
        </Content>
      </Layout>
    </Content>
    <Footer className="footer-layout">🧡 Made by Jordan, Colton, Daniel, and Louie 💌 Hello@getthehotdish.com</Footer>
  </Layout>
);
