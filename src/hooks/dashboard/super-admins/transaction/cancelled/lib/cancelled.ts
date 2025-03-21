import { Timestamp } from "firebase/firestore";

export interface Transaction {
  midtransToken: string;
  orderId: string;
  createdAt: Timestamp;
  status: string;
  transactionLink: string;
  updatedAt: Timestamp;
  paymentDetails: {
    grossAmount: string;
    paymentType: string;
    method: string;
    statusCode: string;
    statusMessage: string;
    transactionId: string;
    transactionStatus: string;
    transactionTime: string;
  };
  productDetails: {
    id: string;
    title: string;
    price: number;
    image: string;
    status: string;
  };
  userDetails: {
    accountType: string;
    email: string;
    fullName: string;
    id: string;
    photoURL: string;
    userId: string;
  };
}
