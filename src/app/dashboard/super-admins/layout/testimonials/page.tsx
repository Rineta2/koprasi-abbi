import React from 'react'

import { Metadata } from 'next'

import TestimonialsLayout from '@/hooks/dashboard/super-admins/layout/testimonials/TestimonialsLayout'

export const metadata: Metadata = {
    title: 'Testimonials | Koperasi ABBI',
    description: 'Testimonials',
}

export default function Testimonials() {
    return (
        <TestimonialsLayout />
    )
}
