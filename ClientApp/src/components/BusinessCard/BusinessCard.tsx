import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Menu, Modal } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';
import { UserActions } from './UserActions';

import './BusinessCard.scss';

const { confirm } = Modal;

export const BusinessCard: React.FC<Business> = props => {
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
        <div className="business-tags">
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
