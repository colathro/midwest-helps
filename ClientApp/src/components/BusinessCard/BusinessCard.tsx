import React, { useState } from 'react';
import { Card, Button } from 'antd';

import { BusinessCategoryTag } from './BusinessCategoryTag';
import { BusinessInteractions } from './BusinessInteractions';
import { BusinessLinks } from './BusinessLinks';
import { Business } from '../../types';

import './BusinessCard.scss';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export const BusinessCard: React.FC<Business> = props => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  return (
    <div>
      <UpdateBusiness displayUpdate={displayUpdate} businessId={props.id} />
      <Card
        title={props.name}
        className="business-card"
        bordered={false}
        extra={
          <Button
            type="dashed"
            onClick={() => {
              setDisplayUpdate(true);
            }}
          >
            🖊
          </Button>
        }
      >
        <BusinessCategoryTag category={props.category} />
        <p>{props.message}</p>
        <div className="business-tags">
          <BusinessInteractions interactions={props.interactions} />
          <BusinessLinks
            giftCardUrl={props.giftCardUrl}
            phone={props.phoneNumber}
            webUrl={props.website}
          />
        </div>
      </Card>
    </div>
  );
};
