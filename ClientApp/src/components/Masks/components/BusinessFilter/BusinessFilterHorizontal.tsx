import React from 'react';
import { Select } from 'antd';
import { filterOptions, BusinessFilterProps } from './BusinessFilterShared';

import './BusinessFilter.scss';

const { Option } = Select;

export const BusinessFilterHorizontal: React.FC<BusinessFilterProps> = ({
  filter,
  setFilter
}) => (
  <Select
    value={filter}
    onChange={(value) => setFilter(value)}
    dropdownClassName="business-filter-dropdown"
    className="filter-drop"
  >
    {Object.entries(filterOptions).map(([_, vals]) => (
      <Option value={vals.value} key={vals.value}>
        {vals.name}
      </Option>
    ))}
  </Select>
);
