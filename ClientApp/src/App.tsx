/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Route } from 'react-router';
import { Layout, Row, Col } from 'antd';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { List } from './components/List';

import './App.scss';

const { Footer } = Layout;

export const App: React.FC = () => (
  <Layout>
    <Route exact path="/" component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="/list" component={List} />
    <Footer>
      <Row justify="center">
        <Col xl={16} lg={16} md={18} sm={20} xs={24}>
          🧡 Made by Jordan, Michael, Tyler, Josie, Daniel, Louie, and Colton 💌
          Hello@getthehotdish.com
        </Col>
      </Row>
    </Footer>
  </Layout>
);
