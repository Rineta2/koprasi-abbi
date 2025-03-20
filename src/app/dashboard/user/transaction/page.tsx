import React from 'react'

import TransactionLayout from '@/hooks/dashboard/user/transaksi/transaction/TransactionLayout';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Transaksi User',
    description: 'Halaman transaksi user',
}

export default function page() {
    return (
        <TransactionLayout />
    )
}
