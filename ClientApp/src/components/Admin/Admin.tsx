import React from 'react';
import { Layout, PageHeader, Button } from 'antd';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import { MaskRequestApprovals } from './Pages/MaskRequestApprovals';
import { ListingApprovals } from './Pages/ListingApprovals';

import './Admin.scss';

const useQuery = () => new URLSearchParams(useLocation().search);

export const Admin: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const key = query.get('key');

  const gotoFreeMoney = () => {
    history.push('/admin/freemoney');
  };

  const gotoMaskRequests = () => {
    history.push(`/admin/maskrequests?key=${key}`);
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
          </Button>,
          <Button key="2" onClick={gotoMaskRequests}>
            Mask Requests
          </Button>
        ]}
      ></PageHeader>
      <Switch>
        <Route path="/admin/maskrequests" component={MaskRequestApprovals} />
        <Route path="/admin" component={ListingApprovals} />
      </Switch>
    </Layout>
  );
};
