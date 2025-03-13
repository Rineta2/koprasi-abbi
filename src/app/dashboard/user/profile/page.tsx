import React from 'react'

import ProfileLayout from '@/hooks/dashboard/user/pengaturan/profile/ProfileLayout';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pengaturan User - Profil',
    description: 'Halaman pengaturan user - profil',
}

export default function page() {
    return (
        <ProfileLayout />
    )
}
