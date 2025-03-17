export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UsedByEntry {
  joinedAt: Timestamp;
  username: string;
}

export interface Supporter {
  uid: string;
  username: string;
  referralCode: string;
  referredBy: string;
  type: string;
  count: number;
  joinedAt: Timestamp;
  status: string;
  usedBy?: {
    username: string;
    joinedAt: Timestamp;
  }[];
}

export interface ReferralNetwork {
  id: string;
  ownerUid: string;
  ownerUsername: string;
  ownerReferralCode: string;
  type: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  supporters: Supporter[];
  ownerStatus: string;
}

export interface User {
  username: string;
  joinedAt: Timestamp;
}
