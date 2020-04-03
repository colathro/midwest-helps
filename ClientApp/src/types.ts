export interface Business {
  id: string;
  name: string;
  category: BusinessCategory;
  hours?: BusinessHours;
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
  [key in BusinessCategory]: { name: string; value: number };
} = {
  Brewery: { name: '🍸 Brewery & Distillery', value: 0 },
  Coffee: { name: '☕ Coffee', value: 1 },
  Restaurant: { name: '🍔 Restaurant & Bar', value: 6 },
  Art: { name: '🎨 Art & Culture', value: 9 },
  Beauty: { name: '💈 Beauty', value: 10 },
  Entertainment: { name: '🎸 Entertainment', value: 2 },
  Grocery: { name: '🛒 Grocery', value: 3 },
  Religion: { name: '🙏 Religion & Spiritual', value: 5 },
  Retail: { name: '👕 Retail', value: 7 },
  Wellness: { name: '🧡 Wellness', value: 8 },
  Other: { name: '📦 Other', value: 4 }
};

export const BUSINESS_HOURS: {
  [key in BusinessHours]: string;
} = {
  Closed: '❌ — Closed',
  Limited: '⏱ — Limited',
  Regular: '✔ — Regular'
};
