import React from 'react';
import { Card } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';
import { UserActions } from './UserActions';

import './BusinessCard.scss';

export const BusinessCard: React.FC<Business> = props => {
  return (
    <Card title={props.name} className="business-card" bordered={false}>
      <BusinessCategoryTag category={props.category} />
      <p>{props.message}</p>
      <div className="business-tags">
        <BusinessInteractions interactions={props.interactions} />
        <UserActions business={props} />
        <BusinessLinks
          giftCardUrl={props.giftCardUrl}
          phone={props.phoneNumber}
          webUrl={props.website}
        />
      </div>
    </Card>
  );
};
