
export enum AppScreen {
  HOME = 'HOME',
  ORDER_PLACEMENT = 'ORDER_PLACEMENT',
  MISSIONS = 'MISSIONS', // Was JOB_FEED
  CUSTODY = 'CUSTODY',   // Was DELIVERY_PROOF
  KYC_VERIFICATION = 'KYC_VERIFICATION',
  ORDER_TRACKING = 'ORDER_TRACKING',
  PROFILE = 'PROFILE',
  WALLET = 'WALLET',
  
  // Profile Sub-screens
  PERSONAL_INFO = 'PERSONAL_INFO',
  DELIVERY_HISTORY = 'DELIVERY_HISTORY',
  NOTIFICATIONS = 'NOTIFICATIONS',
  SECURITY = 'SECURITY',
  HELP = 'HELP',
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
export type VehicleType = 'MOTORBIKE' | 'CAR' | 'VAN' | 'TRUCK' | 'AMBULANCE' | 'DRONE' | 'TROTRO';

export interface User {
  name: string;
  role: UserRole;
  isVerified: boolean;
  phone?: string;
  vehicle?: VehicleType;
  department?: string;
  badges?: ('KYC' | 'FDA_CERTIFIED' | 'TRUSTED_PARTNER')[];
}
