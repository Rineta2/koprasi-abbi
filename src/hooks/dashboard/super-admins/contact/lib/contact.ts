export interface Contact {
    id: string;
    email: string;
    message: string;
    name: string;
    phone: string;
    status: 'unread' | 'read';
    timestamp: string;
}