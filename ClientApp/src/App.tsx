/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { List } from './components/List';
import DocumentTitle from 'react-document-title';

import './App.scss';

const { Footer, Content } = Layout;

export const App: React.FC = () => (
  <Layout>
    <DocumentTitle title="Hotdish—Support small businesses" />
    <Content className="main-content">
      <Switch>
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/list" component={List} />
        <Route path="/" component={Home} />
      </Switch>
    </Content>
    <Footer></Footer>
  </Layout>
);
