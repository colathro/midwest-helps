export interface Business {
  id?: string;
  name: string;
  category: BusinessCategory;
  hours?: BusinessHours;
  phoneNumber?: string;
  website?: string;
  message?: string;
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

export type BusinessHours = 'None' | 'Closed' | 'Limited' | 'Regular';

export type BusinessDeliveryApp =
  | 'UberEats'
  | 'Grubhub'
  | 'DoorDash'
  | 'Postmates'
  | 'FoodDudes'
  | 'BiteSquad';

export const BUSINESS_DELIVERY_APP: {
  [key in BusinessDeliveryApp]: string;
} = {
  UberEats: 'UberEats',
  Grubhub: 'Grubhub',
  DoorDash: 'DoorDash',
  Postmates: 'Postmates',
  FoodDudes: 'FoodDudes',
  BiteSquad: 'BiteSquad',
};

export type BusinessInteraction =
  | 'Appointment'
  | 'CurbSide'
  | 'Delivery'
  | 'LiveStream'
  | 'TakeOut'
  | 'DriveThru';

export const BUSINESS_INTERACTIONS: {
  [key in BusinessInteraction]: string;
} = {
  Appointment: 'Appointment',
  CurbSide: 'CurbSide',
  Delivery: 'Delivery',
  LiveStream: 'LiveStream',
  TakeOut: 'TakeOut',
  DriveThru: 'DriveThru',
};

export const BUSINESS_CATEGORY_STRINGS: {
  [key in BusinessCategory]: { name: string; value: number };
} = {
  Brewery: { name: 'Brewery & Distillery', value: 0 },
  Coffee: { name: 'Coffee', value: 1 },
  Restaurant: { name: 'Restaurant & Bar', value: 6 },
  Art: { name: 'Art & Culture', value: 9 },
  Beauty: { name: 'Beauty', value: 10 },
  Entertainment: { name: 'Entertainment', value: 2 },
  Grocery: { name: 'Grocery', value: 3 },
  Religion: { name: 'Religion & Spiritual', value: 5 },
  Retail: { name: 'Retail', value: 7 },
  Wellness: { name: 'Wellness', value: 8 },
  Other: { name: 'Other', value: 4 },
};

export const BUSINESS_HOURS: {
  [key in BusinessHours]: string;
} = {
  None: '',
  Closed: 'Closed',
  Limited: 'Limited',
  Regular: 'Regular',
};

export enum ReportType {
  innacurate = 1,
  spam = 2,
  offensive = 3,
}

export interface MaskRequest {
  id?: string;
  partitionKey: string;
  createdOn: string;
}

export type MaskFor =
  | 'MedicalFacility'
  | 'NonProfit'
  | 'EssentialWorker'
  | 'Myself';

export const MASKFOR: {
  [key in MaskFor]: string;
} = {
  MedicalFacility: 'Medical professionals or medical facility',
  NonProfit: 'Non-profit',
  EssentialWorker: 'Essential worker',
  Myself: 'Myself or family',
};
