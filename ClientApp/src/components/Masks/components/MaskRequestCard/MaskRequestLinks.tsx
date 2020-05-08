/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useRef } from 'react';
import { Button, Modal, Descriptions, Collapse } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  InfoCircleOutlined,
  CopyOutlined
} from '@ant-design/icons';
import { IMaskRequest } from '../../../../types';
import CopyText from './copytext';

export interface MaskRequestLinksProps {
  maskRequest?: IMaskRequest;
}

const { Panel } = Collapse;

export const MaskRequestLinks: React.FC<MaskRequestLinksProps> = (props) => {
  const maskRequest = props.maskRequest;

  const emailCopy = () => {
    var copyText = document.getElementById('email') as HTMLInputElement;
    copyText.select();
    document.execCommand('Copy');
  };

  const phoneCopy = () => {
    var copyText = document.getElementById('phone') as HTMLInputElement;
    copyText.select();
    document.execCommand('Copy');
  };

  const info = () =>
    Modal.info({
      content: (
        <Collapse defaultActiveKey={['1']}>
          <Panel header="Contact Info" key="1">
            <Descriptions className="contact-info">
              <Descriptions.Item span={3} label="Company">
                {maskRequest?.recipient.company}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Contact Name">
                {maskRequest?.recipient.name}
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Email">
                {maskRequest?.recipient.email}
                {'  '}
                <Button icon={<CopyOutlined />} onClick={emailCopy}></Button>
              </Descriptions.Item>
              <Descriptions.Item span={3} label="Phone">
                {maskRequest?.recipient.phone}
                {'  '}
                <Button icon={<CopyOutlined />} onClick={phoneCopy}></Button>
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header="Masks Needed" key="2">
            <Descriptions>
              <Descriptions.Item
                span={3}
                label={`Needed Masks`}
                className="masks-needed"
              >
                {maskRequest?.maskDetails.masks.map((mask, index) => {
                  return (
                    <div>
                      {mask.type} - {mask.quantity}
                    </div>
                  );
                })}
              </Descriptions.Item>
              <Descriptions.Item
                span={3}
                label={`Mask Requirements`}
                className="contact-info"
              >
                {maskRequest?.maskDetails.requirements}
              </Descriptions.Item>
            </Descriptions>
          </Panel>
          <Panel header="Delivery Methods" key="3">
            <Descriptions>
              <Descriptions.Item
                span={3}
                label={`Delivery Notes`}
                className="contact-info"
              >
                {maskRequest?.delivery.notes}
              </Descriptions.Item>
              {maskRequest?.delivery.addresses.map((address, index) => {
                return (
                  <Descriptions.Item
                    span={3}
                    label={`${address.type} Address`}
                    className="address-box"
                  >
                    <span>
                      <div style={{ display: 'inline-block' }}>
                        {address.address1}
                      </div>
                      <div>{address.address2}</div>
                      <div style={{ display: 'inline-block' }}>
                        {address.city}, {address.state} {address.zipCode}
                      </div>
                    </span>
                  </Descriptions.Item>
                );
              })}
            </Descriptions>
          </Panel>
          <form style={{ position: 'absolute', left: '-9999px' }}>
            <input id="email" value={maskRequest?.recipient.email!} />
            <input id="phone" value={maskRequest?.recipient.phone!} />
          </form>
        </Collapse>
      ),
      maskClosable: true,
      icon: <div></div>,
      className: 'info-modal'
    });

  return (
    <div className="business-links">
      <Button onClick={info} icon={<InfoCircleOutlined />}></Button>
    </div>
  );
};
