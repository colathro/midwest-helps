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
  | 'Brewery'
  | 'Coffee'
  | 'Entertainment'
  | 'Grocery'
  | 'Other'
  | 'Religion'
  | 'Restaurant'
  | 'Retail'
  | 'Wellness'
  | 'Art'
  | 'Beauty';

export type BusinessHours = 'Closed' | 'Limited' | 'Regular';

export type BusinessDeliveryApp =
  | 'UberEats'
  | 'Grubhub'
  | 'DoorDash'
  | 'Postmates'
  | 'FoodDudes'
  | 'BiteSquad';

export type BusinessInteraction =
  | 'Appointment'
  | 'CurbSide'
  | 'Delivery'
  | 'LiveStream'
  | 'TakeOut'
  | 'DriveThru';

export const BUSINESS_CATEGORY_STRINGS: {
  [key in BusinessCategory]: string;
} = {
  Art: '🎨 Art & Culture',
  Brewery: '🍸 Brewery & Distillery',
  Beauty: '💈 Beauty',
  Coffee: '☕ Coffee',
  Entertainment: '🎸 Entertainment',
  Grocery: '🛒 Grocery',
  Other: '📦 Other',
  Religion: '🙏 Religion & Spiritual',
  Restaurant: '🍔 Restaurant & Bar',
  Retail: '👕 Retail',
  Wellness: '🧡 Wellness'
};

export const BUSINESS_HOURS: {
  [key in BusinessHours]: string;
} = {
  Closed: '❌ — Closed',
  Limited: '⏱ — Limited',
  Regular: '✔ — Regular'
};
