import React from 'react'

import { Metadata } from 'next'

import SisaHasilUsahaLayout from '@/hooks/dashboard/super-admins/layout/sisa-hasil-usaha/SisaHasilUsahaLayout'

export const metadata: Metadata = {
    title: 'Sisa Hasil Usaha | Koperasi ABBI',
    description: 'Sisa Hasil Usaha',
}

export default function SisaHasilUsaha() {
    return (
        <SisaHasilUsahaLayout />
    )
}
