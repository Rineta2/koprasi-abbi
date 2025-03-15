import React from 'react'

import { Metadata } from 'next'

import PendaftaranAnggotaLayout from '@/hooks/dashboard/super-admins/layout/pendaftaran-anggota/PendaftaranAnggotaLayout'

export const metadata: Metadata = {
    title: 'Pendaftaran Anggota | Koperasi ABBI',
    description: 'Pendaftaran Anggota',
}

export default function PendaftaranAnggota() {
    return (
        <PendaftaranAnggotaLayout />
    )
}
