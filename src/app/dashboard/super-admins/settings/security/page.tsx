import React from 'react'

import SettingsSecurityLayout from '@/hooks/dashboard/super-admins/settings/security/SecurityLayout'

export const metadata = {
    title: 'Security | Koperasi ABBI',
    description: 'Halaman Security Koperasi ABBI',
}

export default function page() {
    return (
        <SettingsSecurityLayout />
    )
}
