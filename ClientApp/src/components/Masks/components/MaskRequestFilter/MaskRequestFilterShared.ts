import { MaskType, MASK_TYPE_STRINGS } from '../../../../types';

type MaskRequestCategoryAndDefault = MaskType | 'all';

export interface MaskRequestFilterProps {
  filter: number;
  setFilter: (filter: number) => void;
}

export const filterOptions: {
  [category in MaskRequestCategoryAndDefault]: { name: string; value: number };
} = {
  all: { name: 'All Types', value: -1 },
  ...MASK_TYPE_STRINGS
};
