import React from 'react'

import TransactionPaid from '@/hooks/dashboard/user/transaksi/paid/TransactionPaid';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Transaksi Berhasil',
    description: 'Halaman transaksi berhasil',
}

export default function page() {
    return (
        <TransactionPaid />
    )
}
