import React from 'react'

import ProfileLayout from '@/hooks/dashboard/user/product/ProductLayout';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Product - Koperasi ABBI',
    description: 'Halaman Product user - profil',
}

export default function page() {
    return (
        <ProfileLayout />
    )
}
