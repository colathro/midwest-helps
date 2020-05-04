import React from 'react';
import { Menu, Affix } from 'antd';
import {
  filterOptions,
  MaskRequestFilterProps
} from './MaskRequestFilterShared';

import './MaskRequestFilter.scss';

export const MaskRequestFilterVertical: React.FC<MaskRequestFilterProps> = ({
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
