import { Timestamp } from "firebase/firestore";

export interface StatusContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
