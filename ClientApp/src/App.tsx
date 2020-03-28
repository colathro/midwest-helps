import React from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home/Home';
import './App.scss';

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => (
  <Layout>
          <Route exact path='/' component={Home} />
  </Layout>
);
