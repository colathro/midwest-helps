import React from 'react';
import { Card } from 'antd';

import './CompanyCard.scss';
import { CompanyCategoryTag } from './CompanyCategoryTag';
import { CompanyLinks } from './CompanyLinks';
import { CompanyInteractions } from './CompanyInteractions';

export interface CompanyCardProps {
  title: string;
  category: CompanyCategory;
  lastUpdate: Date;
  message: string;
  interactions: CompanyInteraction[];
  giftCardUrl?: string;
  phone?: string;
  webUrl?: string;
}

export type CompanyCategory =
  | 'brewery'
  | 'coffee'
  | 'entertainment'
  | 'grocery'
  | 'other'
  | 'religion'
  | 'restaurant'
  | 'retail'
  | 'wellness';

export type CompanyInteraction =
  | 'appointment'
  | 'curbside'
  | 'delivery'
  | 'livestream'
  | 'takeout';

export const CompanyCard: React.FC<CompanyCardProps> = props => (
  <Card
    title={props.title}
    className="company-card"
    extra={props.lastUpdate.toDateString()}
    bordered={false}
  >
    <CompanyCategoryTag category={props.category} />
    <CompanyLinks
      giftCardUrl={props.giftCardUrl}
      phone={props.phone}
      webUrl={props.webUrl}
    />
    <p>{props.message}</p>
    <CompanyInteractions interactions={props.interactions} />
  </Card>
);
