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
      <Title>Hotdish</Title>
    </Header>
    <Content>
      <Layout className="site-layout-background">
        <Sider className="site-layout-background" width={200}>
          Sider
        </Sider>
        <Content>
          <Route exact path='/' component={Home} />
        </Content>
      </Layout>
    </Content>
    <Footer>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);
