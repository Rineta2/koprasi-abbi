import { Timestamp } from "firebase/firestore";

export interface Articles {
    id: string;
    title: string;
    description: string;
    content: string;
    thumbnail: string;
    status: 'draft' | 'published';
    author: {
        name: string;
        photoURL: string;
        role: string;
    };
    slug: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}