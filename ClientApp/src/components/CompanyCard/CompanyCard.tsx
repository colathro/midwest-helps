import React from 'react';
import { Card } from 'antd';

import './companyCard.scss';

export interface CompanyCardProps {
  title: string;
  categories: CompanyCategory[];
  lastUpdate: Date;
  message: string;
  interactions: Interaction[];
  phone?: string;
  webUrl?: string;
  giftCardUrl?: string;
}

export enum CompanyCategory {
  Brewery,
  Coffee,
  Entertainment,
  Grocery,
  Other,
  Religion,
  Restaurant,
  Retail,
  Wellness
}

export enum Interaction {
  Appointment,
  Curbside,
  Delivery,
  Livestream,
  Takeout
}

export const CompanyCard: React.FC<CompanyCardProps> = props => {
  return <Card>{props.title}</Card>;
};
