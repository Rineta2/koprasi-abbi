import React from 'react'

export const metadata = {
    title: 'Payment Status',
    description: 'Payment Status',
}

import TransactionStatus from '@/hooks/pages/payment/TransactionStatus'

export default function page() {
    return (
        <TransactionStatus />
    )
}
