import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';

import './BusinessCard.scss';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export const BusinessCard: React.FC<Business> = props => {
  const [business, setBusiness] = useState(props);
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const displayUpdateForm = () => {
    setDisplayUpdate(true);
  };

  const callbackFunction = (businessBack: Business) => {
    setBusiness(businessBack);
    setDisplayUpdate(false);
  };

  return (
    <div>
      {displayUpdate && (
        <UpdateBusiness
          business={business}
          bussinessCardCallback={callbackFunction}
        />
      )}

      <Card
        title={business.name}
        className="business-card"
        bordered={false}
        extra={
          <Button type="dashed" onClick={() => displayUpdateForm()}>
            🖊
          </Button>
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
