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
  [key: string]: any;
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
  BiteSquad: 'BiteSquad'
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
  DriveThru: 'DriveThru'
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
  Other: { name: 'Other', value: 4 }
};

export const BUSINESS_HOURS: {
  [key in BusinessHours]: string;
} = {
  None: '',
  Closed: 'Closed',
  Limited: 'Limited',
  Regular: 'Regular'
};

export type ContactFields = {
  Name: string;
  Email: string;
  Message: string;
};

export const REPORT_TYPES = {
  innacurate: 1,
  spam: 2,
  offensive: 3
};

export type DeliverySectionFields = {
  name: string;
  email: string;
  company: string;
  phoneNumber: string;
};

export type MaskSectionFields = {
  maskFor: MaskFor;
  maskRequirements: string;
};

export type GetStartedSectionFields = {
  maskFor: MaskFor;
  name: string;
  company: string;
  email: string;
  phoneNumber: string;
};

export interface IMaskRequest {
  recipient: IRecipient;
  maskDetails: IMaskDetails;
  delivery: IDelivery;
}

export interface IRecipient {
  maskFor: MaskFor;
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface IMaskDetails {
  masks: IMaskInfo[];
  requirements: string;
}

export interface IMaskInfo {
  type: MaskType;
  quantity: number;
}

export interface IDelivery {
  addresses: IAddress[];
  notes: string;
}

export interface IAddress {
  type: ReceiveMaskChannel;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
}

export type MaskFor =
  | 'MedicalFacility'
  | 'NonProfit'
  | 'EssentialWorker'
  | 'Myself';

export const MASK_FOR: {
  [key in MaskFor]: string;
} = {
  MedicalFacility: 'Medical professionals or medical facility',
  NonProfit: 'Non-profit',
  EssentialWorker: 'Essential worker',
  Myself: 'Myself or family'
};

export type MaskType =
  | 'Fabric'
  | 'FaceShield'
  | 'EarGuards'
  | 'ScrubCaps'
  | 'Others';

export const MASK_TYPE: {
  [key in MaskType]: string;
} = {
  Fabric: 'Fabric masks',
  FaceShield: 'Face shields',
  EarGuards: 'Ear guards',
  ScrubCaps: 'Scrub caps',
  Others: 'Others'
};

export type ReceiveMaskChannel = 'DropOff' | 'Mail';

export const RECEIVE_MASK_CHANNEL: {
  [key in ReceiveMaskChannel]: string;
} = {
  DropOff: 'Drop-off',
  Mail: 'Mail'
};

export type MaskRequestChannel = 'Recipient' | 'Mask' | 'Delivery';

export const MASK_REQUEST_SECTION: {
  [key in MaskRequestChannel]: { label: string; value: string };
} = {
  Recipient: { label: '1. Get started', value: 'Recipient' },
  Mask: { label: '2. Mask details', value: 'Mask' },
  Delivery: { label: '3. Delivery details', value: 'Delivery' }
};

export interface IRecipientSection {
  maskFor: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface IMaskSection {
  maskType: string[];
  maskRequirements: string;
}

export interface IDeliverySection {
  receiveMaskChannel: string[];
  deliveryNotes: string;
  dropOffAddress1: string;
  dropOffAddress2: string;
  dropOffCity: string;
  dropOffState: string;
  dropOffZipCode: string;
  mailAddress1: string;
  mailAddress2: string;
  mailCity: string;
  mailState: string;
  mailZipCode: string;
}
