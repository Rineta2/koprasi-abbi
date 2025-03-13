import React from 'react'

import CommunityLayout from '@/hooks/dashboard/user/community/CommunityLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Community | Koprasi ABBI',
    description: 'Halaman community user',
}

export default function Community() {
    return (
        <CommunityLayout />
    )
}
