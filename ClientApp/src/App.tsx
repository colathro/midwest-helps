import React from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { List } from './components/List';
import './App.scss';

import { Layout } from 'antd';

export const App: React.FC = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/list" component={List} />
  </Layout>
);
