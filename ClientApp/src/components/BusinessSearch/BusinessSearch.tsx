import React, { ReactNode } from 'react';
import { Input, Affix } from 'antd';
import { useWindowSize } from '../../globalHooks';

import './BusinessSearch.scss';

interface BusinessSearchProps {
  searchText: string;
  setSearchText: (searchText: string) => void;
  filterComponent?: ReactNode;
}

const { Search } = Input;

export const BusinessSearch: React.FC<BusinessSearchProps> = ({
  searchText,
  setSearchText,
  filterComponent
}) => {
  const windowSize = useWindowSize();
  const isLargeWindowSize = windowSize?.width && windowSize.width >= 992;

  return (
    <Affix offsetTop={isLargeWindowSize ? 72 : 64}>
      <div className="business-search">
        <Search
          addonBefore={filterComponent}
          allowClear
          placeholder="Search for a business..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>
    </Affix>
  );
};
