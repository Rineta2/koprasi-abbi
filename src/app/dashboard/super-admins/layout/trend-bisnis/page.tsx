import React from 'react'

import { Metadata } from 'next'

import TrendBisnisLayout from '@/hooks/dashboard/super-admins/layout/trend-bisnis/TrendBisnisLayout'

export const metadata: Metadata = {
    title: 'Trend Bisnis | Koperasi ABBI',
    description: 'Trend Bisnis',
}

export default function TrendBisnis() {
    return (
        <TrendBisnisLayout />
    )
}
