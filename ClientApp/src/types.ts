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
  | 'religion'
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
  [key in BusinessCategory]: string;
} = {
  art: '🎨 Art & Culture',
  brewery: '🍸 Brewery & Distillery',
  beauty: '💈 Beauty',
  coffee: '☕ Coffee',
  entertainment: '🎸 Entertainment',
  grocery: '🛒 Grocery',
  other: '📦 Other',
  religion: '🙏 Religion & Spiritual',
  restaurant: '🍔 Restaurant & Bar',
  retail: '👕 Retail',
  wellness: '🧡 Wellness'
};
