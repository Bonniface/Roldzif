
export enum AppScreen {
  HOME = 'HOME',
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

export type UserRole = 'COURIER' | 'DOCTOR' | 'HOSPITAL_ADMIN' | 'HR' | 'PHARMACIST';
export type VehicleType = 'MOTORBIKE' | 'CAR' | 'VAN' | 'TRUCK' | 'AMBULANCE' | 'DRONE';

export interface User {
  name: string;
  role: UserRole;
  isVerified: boolean;
  phone?: string;
  vehicle?: VehicleType;
  department?: string; // For hospital staff
}
