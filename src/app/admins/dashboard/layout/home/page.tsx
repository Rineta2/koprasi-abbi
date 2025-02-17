import React from 'react'

import HomeContent from "@/components/dashboard/admin/layout/home/HomeContent"

export async function generateMetadata() {
    return {
        title: 'Home | Admin Dashboard',
        description: 'Admin Dashboard',
    }
}

export default function AdminDashboardScreen() {
    return (
        <HomeContent />
    )
}
