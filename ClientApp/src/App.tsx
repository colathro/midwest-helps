import React, { FunctionComponent } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import './custom.scss';

export const App: FunctionComponent = () => (
  <Layout>
    <Route exact path='/' component={Home} />
  </Layout>
);
