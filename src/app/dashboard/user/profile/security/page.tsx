import React from 'react'

import SecurityLayout from '@/hooks/dashboard/user/pengaturan/security/SecurityLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pengaturan Keamanan | Koprasi Abbi',
    description: 'Halaman Pengaturan Keamanan',
}

export default function page() {
    return (
        <SecurityLayout />
    )
}
