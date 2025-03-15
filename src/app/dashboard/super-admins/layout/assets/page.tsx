import React from 'react'

import { Metadata } from 'next'

import AssetsLayout from '@/hooks/dashboard/super-admins/layout/assets/AssetsLayout'

export const metadata: Metadata = {
    title: 'Assets | Koperasi ABBI',
    description: 'Halaman untuk mengelola assets',
}

export default function page() {
    return (
        <AssetsLayout />
    )
}
