/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { Business } from '../../types';
import { ReportModal } from './ReportModal';

export interface UserActionsProps {
  business?: Business;
}

export const UserActions: React.FC<UserActionsProps> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  var showModal = () => {
    setIsModalVisible(true);
  };

  var hideModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="user-action-links">
      <Tooltip placement="bottom" title="Report">
        <Button type="dashed" onClick={showModal}>
          ❗
        </Button>
      </Tooltip>
      <ReportModal
        business={props.business}
        close={hideModal}
        visible={isModalVisible}
      ></ReportModal>
    </div>
  );
};
