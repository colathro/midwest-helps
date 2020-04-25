import React from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { useHistory, Switch, Route } from 'react-router-dom';
import { ListingApprovals } from './Pages/ListingApprovals';
import { FreeMoney } from './Pages/FreeMoney';

import './Admin.scss';

export const Admin: React.FC = () => {
  const history = useHistory();

  const gotoFreeMoney = () => {
    history.push('/admin/freemoney');
  };

  return (
    <Layout id="admin-page">
      <PageHeader
        className="site-page-header-responsive bg-color"
        title="Admin Portol"
        subTitle="👨‍🦱 lil louie bert"
        extra={[
          <Button key="1" onClick={gotoFreeMoney}>
            Free Money
          </Button>
        ]}
      ></PageHeader>
      <Switch>
        <Route path="/admin/freemoney" component={FreeMoney} />
        <Route path="/admin" component={ListingApprovals} />
      </Switch>
    </Layout>
  );
};
