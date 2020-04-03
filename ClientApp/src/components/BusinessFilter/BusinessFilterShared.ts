import { BusinessCategory, BUSINESS_CATEGORY_STRINGS } from '../../types';

type BusinessCategoryAndDefault = BusinessCategory | 'all';

export interface BusinessFilterProps {
  filter?: number;
}

export const filterOptions: {
  [category in BusinessCategoryAndDefault]: { name: string; value: number };
} = {
  all: { name: '🏙 All', value: -1 },
  ...BUSINESS_CATEGORY_STRINGS
};

export const filterValidator = (filterValue?: number) =>
  filterValue !== undefined ? filterValue : -1;
