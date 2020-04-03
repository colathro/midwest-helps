import React from 'react';
import { Select, Affix } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  BusinessFilterProps,
  filterOptions,
  filterValidator,
  isElementInView
} from './BusinessFilterShared';

import './BusinessFilter.scss';

const { Option } = Select;

export const BusinessFilterHorizontal: React.FC<BusinessFilterProps> = props => {
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
    <Affix offsetTop={64}>
      <div className="business-filter-group-horizontal">
        <p className="filter-title">Filter</p>
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
    </Affix>
  );
};
