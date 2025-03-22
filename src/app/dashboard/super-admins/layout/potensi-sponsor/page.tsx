import React from 'react'

import { Metadata } from 'next'

import PotensiSponsorLayout from '@/hooks/dashboard/super-admins/layout/potensi-sponsor/PotensiSponsorLayout'

export const metadata: Metadata = {
    title: 'Potensi Sponsor | Koperasi ABBI',
    description: 'Potensi Sponsor',
}

export default function PotensiSponsor() {
    return (
        <PotensiSponsorLayout />
    )
}
