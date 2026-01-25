export enum AppScreen {
  ORDER_PLACEMENT = 'ORDER_PLACEMENT',
  JOB_FEED = 'JOB_FEED',
  DELIVERY_PROOF = 'DELIVERY_PROOF',
  KYC_VERIFICATION = 'KYC_VERIFICATION',
  ORDER_TRACKING = 'ORDER_TRACKING',
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
}

export interface Job {
  id: string;
  title: string;
  pickup: string;
  dropoff: string;
  price: number;
  distance: string;
  timeLimit?: string;
  type: 'STAT' | 'COLD_CHAIN' | 'ROUTINE';
  isUrgent?: boolean;
}

export interface User {
  name: string;
  role: 'COURIER' | 'HOSPITAL';
  isVerified: boolean;
}