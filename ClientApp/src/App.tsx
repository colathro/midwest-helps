/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { Home } from './components/Home';
import { Admin } from './components/Admin';
import { Contact } from './components/Contact';
import { List } from './components/List';
import { Masks } from './components/Masks';
import { MaskRequest } from './components/MaskRequest';
import { Covid19 } from './components/Covid19';
import DocumentTitle from 'react-document-title';

import './App.scss';

const { Content } = Layout;

export const App: React.FC = () => (
  <Layout>
    <DocumentTitle title="Midwest Helps - Make a Difference" />
    <Content className="main-content">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/masks" component={Masks} />
        <Route exact path="/maskRequest" component={MaskRequest} />
        <Route exact path="/list" component={List} />
        <Route exact path="/covid19" component={Covid19} />
        <Route path="/" component={Home} />
      </Switch>
    </Content>
  </Layout>
);
