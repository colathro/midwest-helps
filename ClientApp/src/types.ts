export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  hours?: number;
  phoneNumber?: string;
  website?: string;
  message?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  liveStreamUrl?: string;
  orderUrl?: string;
  giftCardUrl?: string;
  interactions: BusinessInteraction[];
  deliveryApps?: BusinessDeliveryApp[];
}

export type BusinessCategory =
  | 'brewery'
  | 'coffee'
  | 'entertainment'
  | 'grocery'
  | 'other'
  | 'religious'
  | 'restaurant'
  | 'retail'
  | 'wellness'
  | 'art'
  | 'beauty';

export type BusinessDeliveryApp =
  | 'uberEats'
  | 'grubhub'
  | 'doorDash'
  | 'postmates'
  | 'foodDudes'
  | 'biteSquad';

export type BusinessInteraction =
  | 'appointment'
  | 'curbSide'
  | 'delivery'
  | 'liveStream'
  | 'takeOut'
  | 'driveThru';

export const BUSINESS_CATEGORY_STRINGS: {
  [key in BusinessCategory]: { name: string; value: number };
} = {
  brewery: { name: '🍸 Brewery & Distillery', value: 0 },
  coffee: { name: '☕ Coffee', value: 1 },
  restaurant: { name: '🍔 Restaurant & Bar', value: 6 },
  art: { name: '🎨 Art & Culture', value: 9 },
  beauty: { name: '💈 Beauty', value: 10 },
  entertainment: { name: '🎸 Entertainment', value: 2 },
  grocery: { name: '🛒 Grocery', value: 3 },
  religious: { name: '🙏 Religion & Spiritual', value: 5 },
  retail: { name: '👕 Retail', value: 7 },
  wellness: { name: '🧡 Wellness', value: 8 },
  other: { name: '📦 Other', value: 4 }
};
