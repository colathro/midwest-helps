/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { Business } from '../../types';

import { ReportBusiness } from './ReportBusiness';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export interface UserActionsProps {
  business: Business;
  setBusiness: Function;
}

export const UserActions: React.FC<UserActionsProps> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  var displayUpdateForm = () => {
    setDisplayUpdate(true);
  };
  var showModal = () => {
    setIsModalVisible(true);
  };

  var hideReportModal = () => {
    setIsModalVisible(false);
  };

  const callbackFunction = (businessBack: Business) => {
    props.setBusiness(businessBack);
    setDisplayUpdate(false);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <a onClick={displayUpdateForm}>🖊 - Edit business</a>
      </Menu.Item>
      <Menu.Item>
        <a onClick={showModal}>❗❗ - Report business</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="user-action-links">
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <Button type="dashed">...</Button>
      </Dropdown>
      {displayUpdate && (
        <UpdateBusiness
          business={props.business}
          bussinessCardCallback={callbackFunction}
        />
      )}
      <ReportBusiness
        business={props.business}
        close={hideReportModal}
        visible={isModalVisible}
      ></ReportBusiness>
    </div>
  );
};
