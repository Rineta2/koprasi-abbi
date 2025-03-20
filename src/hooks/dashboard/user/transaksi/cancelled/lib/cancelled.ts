export interface PaymentDetails {
  grossAmount: string;
  paymentType: string;
  statusCode: string;
  statusMessage: string;
  transactionId: string;
  transactionStatus: string;
  transactionTime: string;
}

interface ProductDetails {
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
}

export interface Transaction {
  id: string;
  orderId: string;
  status: string;
  amount: number;
  createdAt: {
    seconds: number;
  };
  midtransToken: string;
  paymentDetails: PaymentDetails;
  productDetails: ProductDetails;
  transactionLink: string;
  updatedAt: {
    seconds: number;
  };
  userDetails: UserDetails;
}

// Add interface for DetailRow props
export interface DetailRowProps {
  label: string;
  value: string | number;
  isStatus?: boolean;
  isPrimary?: boolean;
  isCode?: boolean;
}
