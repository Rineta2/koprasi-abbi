import React from 'react'

import { Metadata } from 'next'

import ProgramAffiliateKopreasiAbbiLayout from '@/hooks/dashboard/super-admins/layout/program-affiliate-koperasi-abbi/ProgramAffiliateKopreasiAbbiLayout'

export const metadata: Metadata = {
    title: 'Program Affiliate Koperasi ABBI | Koperasi ABBI',
    description: 'Program Affiliate Koperasi ABBI',
}

export default function ProgramAffiliateKopreasiAbbi() {
    return (
        <ProgramAffiliateKopreasiAbbiLayout />
    )
}
