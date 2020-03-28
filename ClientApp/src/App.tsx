import React from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import './App.scss';

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

export const App: React.FC = () => (
  <Layout>
    <Header className="header">
      <Title className="title">Hotdish</Title>
    </Header>
    <Content className="content-layout">
      <Layout className="site-layout-background">
        <Content className="content-home">
          <Route exact path='/' component={Home} />
        </Content>
      </Layout>
    </Content>
    <Footer className="footer-layout">Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);
