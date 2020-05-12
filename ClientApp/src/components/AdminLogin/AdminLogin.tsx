import React from 'react';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { Login } from './components/Login';
import { Register } from './components/Register';


import './AdminLogin.scss';

export const AdminLogin: React.FC = () => {
  return (
    <Layout id="adminlogin">
      <Switch>
        <Route path="/admin/register" component={Register} />
        <Route path="/admin" component={Login} />
      </Switch>
    </Layout>
  );
};
