import React from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home/Home';
import { Contact } from './components/Contact/Contact';
import { List } from './components/List/List';
import './App.scss';

import { Layout } from 'antd';
import { Typography } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

export const App: React.FC = () => (
  <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/list' component={List} />
  </Layout>
);
