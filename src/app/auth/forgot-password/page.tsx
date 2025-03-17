import ForgotPasswordLayout from '@/components/auth/forgot-password/ForgotPasswordLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Lupa Password | Koperasi ABBI',
    description: 'Halaman untuk mereset password',
}

export default function ForgotPasswordPage() {
    return <ForgotPasswordLayout />
}