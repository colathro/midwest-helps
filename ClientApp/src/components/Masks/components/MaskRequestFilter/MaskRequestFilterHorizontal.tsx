import React from 'react';
import { Select } from 'antd';
import {
  filterOptions,
  MaskRequestFilterProps
} from './MaskRequestFilterShared';

import './MaskRequestFilter.scss';

const { Option } = Select;

export const MaskRequestFilterHorizontal: React.FC<MaskRequestFilterProps> = ({
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
