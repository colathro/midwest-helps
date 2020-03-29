import React from 'react';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { CompanyCategory } from '../CompanyCard/CompanyCard';

import './CompanyFilters.scss';

type CompanyCategoryAndDefault = CompanyCategory | 'all';

const companyCategoryTags: { [key in CompanyCategoryAndDefault]: string } = {
  all: '🏙 All',
  brewery: '🍸 Brewery & Distillery',
  coffee: '☕ Coffee',
  entertainment: '🎸 Entertainment',
  grocery: '🛒 Grocery',
  religion: '🙏 Religion & Spiritual',
  restaurant: '🍔 Restaurant & Bar',
  retail: '👕 Retail',
  wellness: '🧡 Wellness',
  other: '📦 Other'
};

const { Option } = Select;

export interface CompanyFiltersProps {
  filter?: CompanyCategory;
}

export const CompanyFilters: React.FC<CompanyFiltersProps> = props => {
  let history = useHistory();

  const activateFilter = (value: CompanyCategoryAndDefault) => {
    if (value === 'all') history.push('/');
    else history.push(`/?filter=${value}`);
  };

  let filterValue: CompanyCategoryAndDefault = props.filter
    ? props.filter
    : 'all';

  return (
    <Select value={filterValue} onChange={activateFilter} maxTagTextLength={40}>
      {Object.entries(companyCategoryTags).map(([key, value]) => (
        <Option value={key}>{value}</Option>
      ))}
    </Select>
  );
};
