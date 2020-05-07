/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import { Button, Modal, Descriptions } from 'antd';
import { PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { IMaskRequest } from '../../../../types';

export interface MaskRequestLinksProps {
  maskRequest?: IMaskRequest;
}

export const MaskRequestLinks: React.FC<MaskRequestLinksProps> = (props) => {
  const maskRequest = props.maskRequest;

  const info = () =>
    Modal.info({
      content: (
        <Descriptions title="Contact Info">
          <Descriptions.Item span={3} label="Company">
            {maskRequest?.recipient.company}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Contact Name">
            {maskRequest?.recipient.name}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Email">
            {maskRequest?.recipient.email}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Phone">
            {maskRequest?.recipient.phone}
          </Descriptions.Item>
          <Descriptions.Item span={3} label={`Needed Masks`}>
            {maskRequest?.maskDetails.masks.map((mask, index) => {
              return (
                <div>
                  {mask.type} - {mask.quantity}
                </div>
              );
            })}
          </Descriptions.Item>
          {maskRequest?.delivery.addresses.map((address, index) => {
            return (
              <Descriptions.Item span={3} label={`${address.type} Address`}>
                <div>{address.address1}</div>
                <div>{address.address2}</div>
                <div>
                  {address.city}, {address.state} {address.zipCode}
                </div>
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      ),
      maskClosable: true,
      icon: <div></div>
    });

  return (
    <div className="business-links">
      <Button type="primary" onClick={info}>
        Info
      </Button>
    </div>
  );
};
