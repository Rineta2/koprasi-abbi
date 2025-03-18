"use client"

import { motion } from 'framer-motion'

import React, { useState } from 'react'

import { useProduct } from '@/hooks/dashboard/super-admins/product/product/lib/FetchProduct'

import ProductForm from '@/hooks/dashboard/super-admins/product/product/ui/ProductForm'

import ProductList from '@/hooks/dashboard/super-admins/product/product/ui/ProductList'

import ProductSkelaton from '@/hooks/dashboard/super-admins/product/product/ProductSkelaton'

import { Product } from '@/hooks/dashboard/super-admins/product/product/lib/Product'

export default function ProductLayout() {
    const [showForm, setShowForm] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    const { products, loading, statusList, tagsList, categoryList } = useProduct()

    const openModal = (product?: Product) => {
        const modal = document.getElementById('product_modal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
        if (product) {
            setEditingProduct(product)
        }
        setShowForm(true);
    };

    if (loading) {
        return <ProductSkelaton />
    }

    return (
        <section className='min-h-screen py-0 px-0'>
            <motion.div
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-card to-card/80 backdrop-blur-sm rounded-3xl border p-8 mb-8 border-border dark:border-border-dark shadow-lg"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="space-y-2">
                        <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent'>
                            Products
                        </h1>
                        <p className='text-text-dark/80 text-lg'>Kelola dan organisir produk Anda</p>
                    </div>

                    <button
                        onClick={() => openModal()}
                        className="group w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 transition-transform group-hover:rotate-90 duration-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="font-medium">Create Content</span>
                    </button>
                </div>
            </motion.div>

            {/* Product List */}

            <ProductList
                products={products}
                onEdit={(product) => openModal(product)}
            />

            {/* Product Form Modal */}
            {showForm && (
                <ProductForm
                    onClose={() => {
                        setShowForm(false)
                        setEditingProduct(null)
                    }}
                    statusList={statusList}
                    tagsList={tagsList}
                    categoryList={categoryList}
                    isEditing={!!editingProduct}
                    editingProduct={editingProduct}
                />
            )}
        </section>
    )
}
