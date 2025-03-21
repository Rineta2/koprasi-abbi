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
  accountType: string;
  usedBy?: UsedByEntry[];
}

export interface ReferralNetwork {
  id: string;
  ownerUid: string;
  ownerUsername: string;
  ownerReferralCode: string;
  ownerAccountType: string;
  type: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  supporters: Supporter[];
}

export interface User {
  username: string;
  joinedAt: Timestamp;
}
