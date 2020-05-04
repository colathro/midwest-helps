import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { useHistory, Switch, Route, useLocation } from 'react-router-dom';
import { MaskRequestApprovals } from './Pages/MaskRequestApprovals';
import { Contacts } from './Pages/Contacts';
import { Reports } from './Pages/Reports';
import { Home } from './Pages/Home';

import './Admin.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const useQuery = () => new URLSearchParams(useLocation().search);

export const Admin: React.FC = () => {
  const history = useHistory();
  const query = useQuery();
  const key = query.get('key');

  const gotoMaskRequests = () => {
    history.push(`/admin/maskrequests?key=${key}`);
  };

  const gotoContacts = () => {
    history.push(`/admin/contacts?key=${key}`);
  };

  const gotoReports = () => {
    history.push(`/admin/reports?key=${key}`);
  };

  const gotoHome = () => {
    history.push(`/admin?key=${key}`);
  };

  return (
    <Layout id="admin-page" style={{ height: '100vh' }}>
      <Sider theme="light" className="sider-border-grey">
        <div style={{ textAlign: 'center' }}>
          <Title level={3} className="title">
            Midwest Helps
          </Title>
        </div>
        <Menu
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          defaultOpenKeys={['sub1']}
        >
          <Menu.Item key="1" onClick={gotoHome}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={gotoContacts}>
            Contacts
          </Menu.Item>
          <Menu.Item key="3" onClick={gotoReports}>
            Reports
          </Menu.Item>
          <SubMenu key="sub1" title="Mask Requests">
            <Menu.Item key="4" onClick={gotoMaskRequests}>
              Approvals
            </Menu.Item>
            <Menu.Item key="5">Removal</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Switch>
        <Route path="/admin/maskrequests" component={MaskRequestApprovals} />
        <Route path="/admin/contacts" component={Contacts} />
        <Route path="/admin/reports" component={Reports} />
        <Route path="/admin" component={Home} />
      </Switch>
    </Layout>
  );
};
