import React from 'react';
import { Card } from 'antd';

import './CompanyCard.scss';
import { CompanyCategoryTag } from './CompanyCategoryTag';
import { CompanyLinks } from './CompanyLinks';
import { CompanyInteractions } from './CompanyInteractions';

export interface CompanyCardProps {
  businessName: string;
  businessCategory: CompanyCategory;
  hours?: number;
  phoneNumber?: string;
  website?: string;
  messageToCustomer?: string;
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
  return (
    <Card title={props.businessName} className="company-card" bordered={false}>
      <CompanyCategoryTag category={props.businessCategory} />
      <p>{props.messageToCustomer}</p>
      <div className="company-tags">
        <CompanyInteractions interactions={props.interactions} />
        <CompanyLinks
          giftCardUrl={props.giftCardUrl}
          phone={props.phoneNumber}
          webUrl={props.website}
        />
      </div>
    </Card>
  );
};
