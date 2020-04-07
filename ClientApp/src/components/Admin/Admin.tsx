import React from 'react';
import { Layout, PageHeader, Tabs, Button, Modal } from 'antd';
import { useHistory, Switch, Route } from 'react-router-dom';
import { ListingApprovals } from './Pages/ListingApprovals';
import { FreeMoney } from './Pages/FreeMoney';

import './Admin.scss';

const { TabPane } = Tabs;

export const Admin: React.FC = () => {
  let history = useHistory();

  const onFinish = (values: any) => {
    console.log(values);
    sendMessage(values);
  };

  function gotoFreeMoney() {
    history.push('/admin/freemoney');
  }

  function success() {
    Modal.success({
      content: 'Your message was sent successfully.',
      onOk: () => goHome(),
    });
  }

  function error() {
    Modal.error({
      title: 'Oops',
      content: 'There was a problem sending your message. Try again later.',
      onOk: () => goHome(),
    });
  }

  function sendMessage(data: any) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    fetch('/api/contact/', requestOptions)
      .then((response) => response)
      .then((data) => {
        console.log('RESPONSE', data);
        if (data.ok) {
          success();
        } else {
          error();
        }
      })
      .catch(function () {
        error();
      });
  }

  const goHome = () => {
    history.push('/');
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
        ]}
      ></PageHeader>
      <Switch>
        <Route path="/admin/freemoney" component={FreeMoney} />
        <Route path="/admin" component={ListingApprovals} />
      </Switch>
    </Layout>
  );
};
