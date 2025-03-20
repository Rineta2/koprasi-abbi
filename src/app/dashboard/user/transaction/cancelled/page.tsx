import React from 'react'

import TransactionCancelledLayout from '@/hooks/dashboard/user/transaksi/cancelled/TransactionCancelledLayout';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Transaksi Dibatalkan | Koperasi ABBI',
    description: 'Halaman transaksi user yang dibatalkan',
}

export default function page() {
    return (
        <TransactionCancelledLayout />
    )
}
