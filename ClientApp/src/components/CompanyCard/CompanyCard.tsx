import React, { useState } from 'react';
import { Card, Button } from 'antd';

import './CompanyCard.scss';
import { CompanyCategoryTag } from './CompanyCategoryTag';
import { CompanyLinks } from './CompanyLinks';
import { CompanyInteractions } from './CompanyInteractions';
import { UpdateBusiness } from '../BusinessForms/UpdateBusiness';

export interface CompanyCardProps {
  id: string;
  name: string;
  category: CompanyCategory;
  hours?: number;
  phoneNumber?: string;
  website?: string;
  message?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  liveStreamUrl?: string;
  orderUrl?: string;
  giftCardUrl?: string;
  interactions: CompanyInteraction[];
  deliveryApps?: CompanyDeliveryApp[];
}

export type CompanyDeliveryApp =
  | 'uberEats'
  | 'grubhub'
  | 'doorDash'
  | 'postmates'
  | 'foodDudes'
  | 'biteSquad';

export type CompanyCategory =
  | 'brewery'
  | 'coffee'
  | 'entertainment'
  | 'grocery'
  | 'other'
  | 'religion'
  | 'restaurant'
  | 'retail'
  | 'wellness'
  | 'art'
  | 'beauty';

export type CompanyInteraction =
  | 'appointment'
  | 'curbSide'
  | 'delivery'
  | 'liveStream'
  | 'takeOut'
  | 'driveThru';

export const CompanyCard: React.FC<CompanyCardProps> = props => {
  const [displayUpdate, setDisplayUpdate] = useState(false);

  const onEditClick = (value: boolean) => {
    setDisplayUpdate(value);
  };

  return (
    <div>
      <UpdateBusiness displayUpdate={displayUpdate} />
      <Card
        title={props.name}
        className="company-card"
        bordered={false}
        extra={
          <span>
            <Button type="dashed" onClick={() => onEditClick(true)}>
              🖊
            </Button>
            <Button type="dashed">🗑</Button>
          </span>
        }
      >
        <CompanyCategoryTag category={props.category} />
        <p>{props.message}</p>
        <div className="company-tags">
          <CompanyInteractions interactions={props.interactions} />
          <CompanyLinks
            giftCardUrl={props.giftCardUrl}
            phone={props.phoneNumber}
            webUrl={props.website}
          />
        </div>
      </Card>
    </div>
  );
};
