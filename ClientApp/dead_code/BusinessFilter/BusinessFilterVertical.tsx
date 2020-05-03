import React from 'react';
import { Menu, Affix } from 'antd';
import { filterOptions, BusinessFilterProps } from './BusinessFilterShared';

import './BusinessFilter.scss';

export const BusinessFilterVertical: React.FC<BusinessFilterProps> = ({
  filter,
  setFilter
}) => (
  <Affix offsetTop={72}>
    <Menu
      id="business-filter-group-vertical"
      onClick={(e) => setFilter(parseInt(e.key, 10))}
      mode="vertical-left"
      selectedKeys={[`${filter}`]}
    >
      {Object.entries(filterOptions).map(([_, vals]) => (
        <Menu.Item key={vals.value}>{vals.name}</Menu.Item>
      ))}
    </Menu>
  </Affix>
);
