import React from 'react'

import { Metadata } from 'next'

import LegalitasiCompanyLayout from '@/hooks/dashboard/super-admins/layout/legalitasi-company/LegalitasiCompanyLayout'

export const metadata: Metadata = {
    title: 'Legalitasi Company | Koprasi ABBI',
    description: 'Halaman Legalitasi Company',
}

export default function page() {
    return (
        <LegalitasiCompanyLayout />
    )
}
