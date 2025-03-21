import { Timestamp } from "firebase/firestore";

export interface PaymentDetails {
  grossAmount: string;
  paymentType: string;
  statusCode: string;
  statusMessage: string;
  transactionId: string;
  transactionStatus: string;
  transactionTime: string;
  vaNumbers: Array<{
    bank: string;
    va_number: string;
  }>;
}

export interface ProductAuthor {
  fullName: string;
  id: string;
  photoUrl: string;
}

export interface ProductDetails {
  author: ProductAuthor;
  id: string;
  image: string;
  price: number;
  status: string;
  title: string;
}

export interface UserDetails {
  accountType: string;
  email: string;
  fullName: string;
  id: string;
  photoURL: string;
  userId: string;
}

export interface Transaction {
  amount: number;
  createdAt: Timestamp;
  midtransToken: string;
  orderId: string;
  paymentDetails: PaymentDetails;
  productDetails: ProductDetails;
  status: string;
  transactionLink: string;
  updatedAt: Timestamp;
  userDetails: UserDetails;
}

// Define interface for chart data
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
    borderWidth?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointHoverRadius?: number;
    pointHoverBorderWidth?: number;
    pointHoverBackgroundColor?: string;
    pointHoverBorderColor?: string;
  }[];
}
