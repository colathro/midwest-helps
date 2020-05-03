import React, { useState } from 'react';
import { Card } from 'antd';
import { BusinessLinks } from './BusinessLinks';
import { IMaskRequest } from '../../../../types';

import './BusinessCard.scss';

export const BusinessCard: React.FC<IMaskRequest> = (props) => {
  const [maskRequest, setMaskRequest] = useState(props);

  return (
    <div>
      <Card
        title={
          <div>
            <span>{maskRequest.recipient.company}</span>
            <span>{maskRequest.createdOn}</span>
          </div>
        }
        className="business-card"
        bordered={false}
      >
        <p>{maskRequest.delivery.notes}</p>
        <div>
          <BusinessLinks
            phone={maskRequest.recipient.email}
            webUrl={maskRequest.recipient.phone}
          />
        </div>
      </Card>
    </div>
  );
};
