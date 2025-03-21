import { Timestamp } from "firebase/firestore";

export interface VANumber {
  bank: string;
  va_number: string;
}

export interface TransactionData {
  orderId: string;
  status: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  transactionLink: string;
  userId: string;
  amount: number;
  userDetails: {
    id: string;
    email: string;
    fullName: string;
    photoURL: string;
    accountType: string;
  };
  productDetails: {
    id: string;
    title: string;
    price: number;
    image: string;
    status: string;
  };
  paymentDetails: {
    paymentType: string;
    vaNumbers: VANumber[];
    transactionTime: string;
    statusMessage: string;
    statusCode: string;
    transactionId: string;
    transactionStatus: string;
    grossAmount: string;
    redirectUrl?: string;
    method?: string;
    token?: string;
  };
}
