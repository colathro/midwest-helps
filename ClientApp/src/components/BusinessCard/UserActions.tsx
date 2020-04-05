/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { Business } from '../../types';

import { ReportBusiness } from '../BusinessForms/ReportBusiness';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export interface UserActionsProps {
  business: Business;
  setBusiness: Function;
}

export const UserActions: React.FC<UserActionsProps> = props => {
  const [displayReport, setDisplayReport] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const displayReportForm = () => {
    setDisplayReport(true);
  };

  const hideReportForm = () => {
    setDisplayReport(false);
  };

  const displayUpdateForm = () => {
    setDisplayUpdate(true);
  };

  const hideUpdateForm = (businessBack: Business) => {
    props.setBusiness(businessBack);
    setDisplayUpdate(false);
  };

  const { confirm } = Modal;

  const displayDeleteForm = () => {
    confirm({
      title: 'Are you sure you want to remove this business?',
      icon: '❌',
      content:
        'A removal request will be sent to our team who will avaliate removing this business from this platform',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteRequest('/api/listing/' + props.business.id);
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  async function deleteRequest(url: string) {
    const requestOptions = {
      method: 'DELETE'
    };

    await fetch(url, requestOptions);
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={displayUpdateForm}>🖊 - Edit business</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={displayReportForm}>❗❗ - Report business</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={displayDeleteForm}>❌ - Delete business</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-action-links">
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Button type="dashed">▪▪▪</Button>
      </Dropdown>
      {displayUpdate && (
        <UpdateBusiness
          business={props.business}
          bussinessCardCallback={hideUpdateForm}
        />
      )}
      <ReportBusiness
        business={props.business}
        close={hideReportForm}
        visible={displayReport}
      ></ReportBusiness>
    </div>
  );
};
