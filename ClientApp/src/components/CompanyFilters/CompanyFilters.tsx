import React from 'react';
import { useHistory } from 'react-router-dom';
import { Radio, Tooltip } from 'antd';
import { CompanyCategory } from '../CompanyCard/CompanyCard';

import './CompanyFilters.scss';

type CompanyCategoryAndDefault = CompanyCategory | 'all';

const companyCategories: CompanyCategoryAndDefault[] = [
  'all',
  'brewery',
  'coffee',
  'entertainment',
  'grocery',
  'religion',
  'restaurant',
  'retail',
  'wellness',
  'other'
];

const companyCategoryTags: { [key in CompanyCategoryAndDefault]: any } = {
  all: { emoji: '🏙', label: 'All' },
  brewery: { emoji: '🍸', label: 'Brewery & Distillery' },
  coffee: { emoji: '☕', label: 'Coffee' },
  entertainment: { emoji: '🎸', label: 'Entertainment' },
  grocery: { emoji: '🛒', label: 'Grocery' },
  other: { emoji: '📦', label: 'Other' },
  religion: { emoji: '🙏', label: 'Religion & Spiritual' },
  restaurant: { emoji: '🍔', label: 'Restaurant & Bar' },
  retail: { emoji: '👕', label: 'Retail' },
  wellness: { emoji: '🧡', label: 'Wellness' }
};

export const CompanyFilters: React.FC = () => {
  let history = useHistory();

  const activateFilter = (e: any) => {
    history.push(`/?tag=${e.target.value}`);
  };

  return (
    <Radio.Group>
      {companyCategories.map(category => (
        <Tooltip title={companyCategoryTags[category].label} key={category}>
          <Radio.Button value={category} onClick={activateFilter}>
            {companyCategoryTags[category].emoji}
          </Radio.Button>
        </Tooltip>
      ))}
    </Radio.Group>
  );
};
