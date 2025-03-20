import { Timestamp } from "firebase/firestore";

export interface UserDetails {
  accountType: string;
  email: string;
  photoURL: string;
  id: string;
  fullName: string;
}

export interface ProductDetails {
  id: string;
  price: number;
  image: string;
  status: string;
  title: string;
}

export interface PaymentDetails {
  statusMessage: string;
  transactionStatus: string;
  transactionId: string;
  statusCode: string;
  grossAmount: string;
  transactionTime: string;
  paymentType: string;
}

export interface Transaction {
  id: string;
  userId: string;
  userDetails: UserDetails;
  productDetails: ProductDetails;
  status: string;
  transactionLink: string;
  orderId: string;
  paymentDetails: PaymentDetails;
  midtransToken: string;
  amount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
