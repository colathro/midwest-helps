import React from 'react';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { BusinessCategory, BUSINESS_CATEGORY_STRINGS } from '../../types';

import './BusinessFilter.scss';

type BusinessCategoryAndDefault = BusinessCategory | 'all';

export interface BusinessFilterProps {
  filter?: number;
}

const filterOptions: { [category: string]: { name: string; value: number } } = {
  all: { name: '🏙 All', value: -1 },
  ...BUSINESS_CATEGORY_STRINGS
};

const { Option } = Select;

export const BusinessFilter: React.FC<BusinessFilterProps> = props => {
  let history = useHistory();

  const activateFilter = (value: number) => {
    if (value === -1) history.push('/');
    else history.push(`/?businesstype=${value}`);
  };

  let filterValue: number = props.filter !== undefined ? props.filter : -1;

  return (
    <div className="business-filter-group">
      <p className="business-filter-label">Filter</p>
      <Select
        value={filterValue}
        onChange={activateFilter}
        dropdownClassName="business-filter-dropdown"
      >
        {Object.entries(filterOptions).map(([_, vals]) => (
          <Option value={vals.value} key={vals.value}>
            {vals.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};
