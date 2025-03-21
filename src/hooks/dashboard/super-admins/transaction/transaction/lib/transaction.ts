import { Timestamp } from "firebase/firestore";

export interface TransactionType {
  id: string;
  amount: number;
  createdAt: Timestamp;
  midtransToken: string;
  orderId: string;
  paymentDetails: {
    grossAmount: string;
    paymentType: string;
    statusCode: string;
    statusMessage: string;
    transactionId: string;
    transactionStatus: string;
    transactionTime: string;
  };
  productDetails: {
    id: string;
    image: string;
    price: number;
    status: string;
    title: string;
  };
  status: string;
  transactionLink: string;
  updatedAt: Timestamp;
  userDetails: {
    accountType: string;
    email: string;
    fullName: string;
    id: string;
    photoURL: string;
    userId: string;
  };
}

export interface UserAccount {
  id: string;
  accountType: string;
  createdAt: Timestamp;
  email: string;
  fullName: string;
  isActive: boolean;
  phoneNumber: string;
  referralCode: string;
  photoURL: string;
  role: string;
  uid: string;
  updatedAt: Timestamp;
  username: string;
}

// Add Product interface
export interface Product {
  id: string;
  author: {
    email: string;
    fullName: string;
    id: string;
    photoUrl: string;
  };
  category: string;
  createdAt: Timestamp;
  description: string;
  image: string;
  price: number;
  slug: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: Timestamp;
}
