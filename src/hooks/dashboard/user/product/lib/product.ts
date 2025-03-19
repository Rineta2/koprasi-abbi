import { Timestamp } from "firebase/firestore";

export interface Author {
  email: string;
  fullName: string;
  id: string;
  photoUrl: string;
}

export interface Product {
  id: string;
  author: Author;
  category: string;
  createdAt: Timestamp; // Timestamp from Firestore
  description: string;
  image: string;
  price: number;
  slug: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: Timestamp; // Timestamp from Firestore
}
