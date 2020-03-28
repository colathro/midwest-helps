import React from 'react';
import { Card } from 'antd';

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

export type Interaction =
  | 'appointment'
  | 'curbside'
  | 'delivery'
  | 'livestream'
  | 'takeout';

export const CompanyCard: React.FC<CompanyCardProps> = props => {
  return <Card>{props.title}</Card>;
};
