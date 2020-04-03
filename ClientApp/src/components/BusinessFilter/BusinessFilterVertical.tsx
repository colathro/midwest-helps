import React from 'react';
import { Menu, Affix } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  filterOptions,
  BusinessFilterProps,
  filterValidator,
  isElementInView
} from './BusinessFilterShared';

import './BusinessFilter.scss';

export const BusinessFilterVertical: React.FC<BusinessFilterProps> = props => {
  const filterValue = filterValidator(props.filter);
  const history = useHistory();

  const activateFilter = (value: number) => {
    if (value === -1) history.push('/');
    else history.push(`/?businesstype=${value}`);
    const topOfCompanies = document.querySelector('#top-of-companies');
    if (topOfCompanies && !isElementInView(topOfCompanies)) {
      topOfCompanies.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <Affix offsetTop={72}>
      <Menu
        id="business-filter-group-vertical"
        onClick={e => activateFilter(parseInt(e.key))}
        mode="vertical-left"
        defaultSelectedKeys={[`${filterValue}`]}
      >
        <p className="filter-title">Filter</p>
        {Object.entries(filterOptions).map(([_, vals]) => (
          <Menu.Item key={vals.value}>{vals.name}</Menu.Item>
        ))}
      </Menu>
    </Affix>
  );
};
