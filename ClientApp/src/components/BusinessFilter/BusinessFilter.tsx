import React from 'react';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { BusinessCategory, BUSINESS_CATEGORY_STRINGS } from '../../types';

import './BusinessFilter.scss';

type BusinessCategoryAndDefault = BusinessCategory | 'all';

export interface BusinessFilterProps {
  filter?: BusinessCategory;
}

const filterOptions = {
  all: '🏙 All',
  ...BUSINESS_CATEGORY_STRINGS
};

const { Option } = Select;

export const BusinessFilter: React.FC<BusinessFilterProps> = props => {
  let history = useHistory();

  const activateFilter = (value: BusinessCategoryAndDefault) => {
    if (value === 'all') history.push('/');
    else history.push(`/?filter=${value}`);
  };

  let filterValue: BusinessCategoryAndDefault = props.filter
    ? props.filter
    : 'all';

  return (
    <div className="business-filter-group">
      <p className="business-filter-label">Filter</p>
      <Select
        value={filterValue}
        onChange={activateFilter}
        dropdownClassName="business-filter-dropdown"
      >
        {Object.entries(filterOptions).map(([key, value]) => (
          <Option value={key}>{value}</Option>
        ))}
      </Select>
    </div>
  );
};
