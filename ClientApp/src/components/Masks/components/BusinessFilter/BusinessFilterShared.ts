import {
  BusinessCategory,
  MaskType,
  MASK_TYPE_STRINGS
} from '../../../../types';

type BusinessCategoryAndDefault = MaskType | 'all';

export interface BusinessFilterProps {
  filter: number;
  setFilter: (filter: number) => void;
}

export const filterOptions: {
  [category in BusinessCategoryAndDefault]: { name: string; value: number };
} = {
  all: { name: 'All Types', value: -1 },
  ...MASK_TYPE_STRINGS
};
