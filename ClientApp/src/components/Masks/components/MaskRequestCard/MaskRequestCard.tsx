import React, { useState } from 'react';
import { Card, Button, Tag } from 'antd';
import { MaskRequestLinks } from './MaskRequestLinks';
import { IMaskRequest, MASK_TYPE } from '../../../../types';

import './MaskRequestCard.scss';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const MaskRequestCard: React.FC<IMaskRequest> = (props) => {
  const [maskRequest, setMaskRequest] = useState(props);

  const createdOn = new Date(maskRequest.createdOn!);
  const address = maskRequest.delivery.addresses[0];

  return (
    <div>
      <Card
        title={
          <div>
            <span>{maskRequest.recipient.company}</span>
            <span className="created-on">
              {months[createdOn.getUTCMonth()] + ' '}
              {createdOn.getUTCDate()}
            </span>
            <div className="city-state">
              {address.city}
              {', '}
              {address.state}
              {' • '}
              {address.type}
            </div>
          </div>
        }
        className="business-card"
        bordered={false}
      >
        <p>{maskRequest.delivery.notes}</p>
        <div className="in-search">
          In search of:{' '}
          {maskRequest.maskDetails.masks.map((needed) => {
            return <Tag>{MASK_TYPE[needed.type]}</Tag>;
          })}
        </div>
        <div className="action-buttons">
          <MaskRequestLinks
            phone={maskRequest.recipient.email}
            webUrl={maskRequest.recipient.phone}
          />
          <Button className="donate-button" type="primary">
            Donate masks
          </Button>
        </div>
      </Card>
    </div>
  );
};
