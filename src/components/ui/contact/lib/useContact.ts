import { database } from '@/utils/firebase'
import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database'
import toast from 'react-hot-toast'
import { ContactFormData } from '../lib/validation'

interface UseContactSubmitProps {
    setIsLoading: (loading: boolean) => void;
    reset: () => void;
}

export function useContactSubmit({ setIsLoading, reset }: UseContactSubmitProps) {
    const checkEmailExists = async (email: string) => {
        try {
            const emailQuery = query(
                ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS),
                orderByChild('email'),
                equalTo(email)
            );

            const snapshot = await get(emailQuery);
            return snapshot.exists();
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        try {
            setIsLoading(true);

            const emailExists = await checkEmailExists(data.email);

            if (emailExists) {
                toast.error('Email ini sudah pernah mengirim pesan sebelumnya.');
                return;
            }

            const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS);

            const contactData = {
                ...data,
                timestamp: new Date().toISOString(),
                status: 'unread'
            };

            await push(contactsRef, contactData);

            reset();
            toast.success('Pesan Anda telah berhasil dikirim!');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return { onSubmit };
}