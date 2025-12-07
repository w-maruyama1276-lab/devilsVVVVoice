
export enum AppView {
  AUTH = 'AUTH',
  OFFERS = 'OFFERS',
  REVIEW = 'REVIEW',
  REWARDS = 'REWARDS',
  PROFILE = 'PROFILE',
  MESSAGES = 'MESSAGES' // 追加
}

export interface Message {
  id: string;
  sender: string;
  title: string;
  body: string;
  date: string;
  isRead: boolean;
  type: 'INVITE' | 'SYSTEM' | 'VIP';
}

export interface User {
  email: string;
  name?: string;
  tags: string[];
  points: number;
  address?: string;
  messages: Message[]; // 追加
}

export type OfferType = 'DESIGN' | 'UX' | 'PHYSICAL';

export interface Offer {
  id: string;
  type: OfferType;
  title: string;
  company: string;
  rewardLevel: 1 | 2 | 3;
  tags: string[];
  description: string;
  placeholder: string;
  imageUrl?: string;
  externalUrl?: string;
}

export interface Reward {
  id: string;
  title: string;
  cost: number;
  level: 1 | 2 | 3;
  icon: string;
}
