import React from 'react'

import CancelledLayout from "@/hooks/dashboard/super-admins/transaction/cancelled/CancelledLayout"

export const metadata = {
    title: 'Cancelled Transaction | Koperasi ABBI',
    description: 'Halaman Cancelled Transaction Koperasi ABBI',
}

export default function Cancelled() {
    return (
        <CancelledLayout />
    )
}
