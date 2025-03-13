import React from 'react'

import { Metadata } from 'next'

import AlamatLayout from '@/hooks/dashboard/user/pengaturan/alamat/AlamatLayout'

export const metadata: Metadata = {
    title: 'Alamat User - Koprasi Abbi',
    description: 'Halaman alamat untuk menambahkan, mengubah, dan menghapus alamat',
}

export default function page() {
    return (
        <AlamatLayout />
    )
}
