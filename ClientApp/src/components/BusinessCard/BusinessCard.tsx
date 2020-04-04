import React, { useState, useEffect } from 'react';
import { Card, Button, Dropdown, Menu } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';
import { UserActions } from './UserActions';

import './BusinessCard.scss';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export const BusinessCard: React.FC<Business> = props => {
  const [business, setBusiness] = useState(props);

  return (
    <div>
      {/* {displayUpdate && (
        <UpdateBusiness
          business={business}
          bussinessCardCallback={callbackFunction}
        />
      )} */}

      <Card
        title={business.name}
        className="business-card"
        bordered={false}
        extra={<UserActions business={business} setBusiness={setBusiness} />}
      >
        <BusinessCategoryTag category={business.category} />
        <p>{business.message}</p>
        <div className="business-tags">
          <BusinessInteractions interactions={business.interactions} />
          {/* <UserActions business={props} /> */}
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
