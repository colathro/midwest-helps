import React, { useState } from 'react';
import { Card } from 'antd';
import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';
import { UserActions } from './UserActions';

import './BusinessCard.scss';

export const BusinessCard: React.FC<Business> = (props) => {
  const [business, setBusiness] = useState(props);

  return (
    <div>
      <Card
        title={business.name}
        className="business-card"
        bordered={false}
        extra={
          <div>
            <UserActions business={business} setBusiness={setBusiness} />
          </div>
        }
      >
        <BusinessCategoryTag category={business.category} />
        <p>{business.message}</p>
        <div>
          <BusinessInteractions interactions={business.interactions} />
          <BusinessLinks
            giftCardUrl={business.giftCardUrl}
            phone={business.phoneNumber}
            webUrl={business.website}
          />
        </div>
      </Card>
    </div>
  );
};
