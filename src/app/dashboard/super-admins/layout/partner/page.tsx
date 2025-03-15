import React from 'react'

import PartnerLayout from '@/hooks/dashboard/super-admins/layout/patner/PartnerLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Partner | Koprasi ABBI',
    description: 'Halaman Partner Koprasi ABBI',
}

export default function page() {
    return (
        <PartnerLayout />
    )
}
