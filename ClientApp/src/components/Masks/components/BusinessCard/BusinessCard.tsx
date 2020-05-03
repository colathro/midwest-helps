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
        title={maskRequest.recipient}
        className="business-card"
        bordered={false}
      >
        <p>{maskRequest.delivery.notes}</p>
        <div>
          <BusinessLinks
            phone={maskRequest.recipient.phone}
            webUrl={maskRequest.recipient.email}
          />
        </div>
      </Card>
    </div>
  );
};
