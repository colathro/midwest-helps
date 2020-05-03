import React from 'react';
import { BusinessCategory, BUSINESS_CATEGORY_STRINGS } from '../../types';

export interface BusinessCategoryTagProps {
  category: BusinessCategory;
}

export const BusinessCategoryTag: React.FC<BusinessCategoryTagProps> = props => (
  <p className="category-tag">
    {BUSINESS_CATEGORY_STRINGS[props.category] &&
      BUSINESS_CATEGORY_STRINGS[props.category].name}
  </p>
);
