import { Timestamp } from "firebase/firestore";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  status: string;
  description: string;
  author: {
    id: string;
    fullName: string;
    email: string;
    photoUrl: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface StatusProduct {
  id: string;
  title: string;
}
