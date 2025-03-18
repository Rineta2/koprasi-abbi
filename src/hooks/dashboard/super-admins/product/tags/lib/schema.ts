import { Timestamp } from "firebase/firestore";

export interface TagsContent {
  id?: string;
  title: string;
  createdAt?: Timestamp;
}
