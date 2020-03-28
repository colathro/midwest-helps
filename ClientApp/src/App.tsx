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
    <Content style={{ padding: '50px 50px' }}>
      <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
        <Sider className="site-layout-background" width={200}>
          Sider
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Route exact path='/' component={Home} />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
);
