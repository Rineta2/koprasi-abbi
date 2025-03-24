import React from 'react'

import { Metadata } from 'next'

import ArticleLayout from '@/hooks/dashboard/super-admins/article/ArticleLayout'

export const metadata: Metadata = {
    title: 'Article | Koperasi ABBI',
    description: 'Halaman untuk membuat article.',
}

export default function page() {
    return (
        <ArticleLayout />
    )
}
