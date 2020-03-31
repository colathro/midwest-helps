import React from 'react';
import { BusinessCategory } from '../../types';

export interface BusinessCategoryTagProps {
  category: BusinessCategory;
}

const typeStrings: { [key in BusinessCategory]: string } = {
  art: '🎨 — Art & Culture',
  brewery: '🍸 Brewery & Distillery',
  beauty: '💈 — Beauty',
  coffee: '☕ Coffee',
  entertainment: '🎸 Entertainment',
  grocery: '🛒 Grocery',
  other: '📦 Other',
  religion: '🙏 Religion & Spiritual',
  restaurant: '🍔 Restaurant & Bar',
  retail: '👕 Retail',
  wellness: '🧡 Wellness'
};

export const BusinessCategoryTag: React.FC<BusinessCategoryTagProps> = props => (
  <p className="category-tag">{typeStrings[props.category]}</p>
);
