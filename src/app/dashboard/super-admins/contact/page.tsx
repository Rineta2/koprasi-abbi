import React from 'react'

import { Metadata } from 'next'

import ContactLayout from '@/hooks/dashboard/super-admins/contact/ContactLayout'

export const metadata: Metadata = {
    title: 'Unread Contact | Koperasi ABBI',
    description: 'Halaman untuk melihat detail pesan kontak dari pengguna.',
}

export default function page() {
    return (
        <ContactLayout />
    )
}
