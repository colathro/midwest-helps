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

export interface IMaskRequest {
  id?: string;
  createdOn?: string;
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

export interface IMaskDonationRequest {
  requestId: string;
  donor: IDonor;
  donation: IMaskInfo[];
}

export interface IMaskDonationDetails {
  //TODO: Add all information relevant to be displayed on admin portal
  requestId: string;
  donor: IDonor;
  donation: IRecipient;
}

export interface IDonor {
  bestContactType: BestContactType;
  name: string;
  company: string;
  email: string;
  phone: string;
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

export type MaskType = 'Fabric' | 'FaceShield' | 'EarGuards' | 'ScrubCaps';

export const MASK_TYPE: {
  [key in MaskType]: string;
} = {
  Fabric: 'Fabric facemasks',
  FaceShield: 'Face shields',
  EarGuards: 'Ear guards',
  ScrubCaps: 'Scrub caps'
};

export const MASK_TYPE_STRINGS: {
  [key in MaskType]: { name: string; value: number };
} = {
  Fabric: { name: 'Fabric facemasks', value: 1 },
  FaceShield: { name: 'Face shields', value: 2 },
  EarGuards: { name: 'Ear guards', value: 3 },
  ScrubCaps: { name: 'Scrub caps', value: 4 }
};

export type ReceiveMaskChannel = 'DropOff' | 'Mail';

export const RECEIVE_MASK_CHANNEL: {
  [key in ReceiveMaskChannel]: string;
} = {
  DropOff: 'Drop-off',
  Mail: 'Mail'
};

export type MaskRequestSection = 'Recipient' | 'Mask' | 'Delivery';

export const MASK_REQUEST_SECTION: {
  [key in MaskRequestSection]: { label: string; value: string };
} = {
  Recipient: { label: '1. Get started', value: 'Recipient' },
  Mask: { label: '2. Mask details', value: 'Mask' },
  Delivery: { label: '3. Delivery details', value: 'Delivery' }
};

export type MaskDonationSection = 'BeforeStart' | 'Donor' | 'Donation';

export const MASK_DONATION_SECTION: {
  [key in MaskDonationSection]: { label: string; value: string };
} = {
  BeforeStart: { label: '1. Before you start', value: 'BeforeStart' },
  Donor: { label: '2. Contact information', value: 'Donor' },
  Donation: { label: '3. Donation', value: 'Donation' }
};

export type BestContactType = 'Email' | 'Phone';

export const BEST_CONTACT_TYPE: {
  [key in BestContactType]: string;
} = {
  Email: 'Email',
  Phone: 'Phone'
};

export interface IRecipientSection {
  maskFor: string;
  name: string;
  company: string;
  email: string;
  phone: string;
}

export interface IMaskSection {
  maskTypes: string[];
  maskRequirements: string;
  fabricQnt: number;
  faceShieldQnt: number;
  earGuardsQnt: number;
  scrubCapsQnt: number;
  othersQnt: number;
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

export type pageDisplayType = 'Form' | 'Success' | 'Fail';

export const PAGE_DISPLAY_TYPE: {
  [key in pageDisplayType]: number;
} = {
  Form: 1,
  Success: 2,
  Fail: 3
};
