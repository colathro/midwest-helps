/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { Home } from './components/Home';
import { Contact } from './components/Contact';
import { List } from './components/List';

import './App.scss';

const { Footer, Content } = Layout;

export const App: React.FC = () => (
  <Layout>
    <Content className="main-content">
      <Switch>
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/list" component={List} />
        <Route path="/" component={Home} />
      </Switch>
    </Content>
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
