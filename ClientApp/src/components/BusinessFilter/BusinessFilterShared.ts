import { BusinessCategory, BUSINESS_CATEGORY_STRINGS } from '../../types';

type BusinessCategoryAndDefault = BusinessCategory | 'all';

export interface BusinessFilterProps {
  filter: number;
  setFilter: (filter: number) => void;
}

export const filterOptions: {
  [category in BusinessCategoryAndDefault]: { name: string; value: number };
} = {
  all: { name: 'All Businesses', value: -1 },
  ...BUSINESS_CATEGORY_STRINGS,
};
