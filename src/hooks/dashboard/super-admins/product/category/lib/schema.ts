import { Timestamp } from "firebase/firestore";

export interface Category {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
