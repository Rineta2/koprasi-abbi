import { Product } from '../lib/Product';

import { useProduct } from '../lib/FetchProduct';

import { Timestamp } from 'firebase/firestore';

import Image from 'next/image';

import { useState } from 'react';

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
}

export default function ProductList({ products, onEdit }: ProductListProps) {
    const { deleteProduct } = useProduct();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('id-ID', {
            dateStyle: 'medium',
            timeStyle: 'short'
        }).format(date);
    };

    // Format price to IDR
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        (document.getElementById('product_details_modal') as HTMLDialogElement)?.showModal();
    };

    const handleDelete = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                setIsDeleting(true);
                await deleteProduct(productToDelete.id);
                setShowDeleteModal(false);
                setProductToDelete(null);
            } catch (error) {
                const err = error as Error;
                console.error('Error deleting product:', err);
                alert(err.message || 'Terjadi kesalahan saat menghapus produk. Silakan coba lagi.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id}
                        className="group bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border backdrop-blur-sm"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Floating Action Buttons */}
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="p-2 bg-background/90 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg text-white bg-primary"
                                    title="Edit Product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(product)}
                                    className="p-2 bg-background/90 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg text-white bg-red-500"
                                    title="Delete Product"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {/* View Details Button */}
                            <button
                                onClick={() => handleViewDetails(product)}
                                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/95 px-6 py-2.5 rounded-full text-sm font-medium 
                                         opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0
                                         hover:bg-primary hover:text-white shadow-lg text-white bg-primary"
                            >
                                View Details
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="relative w-8 h-8">
                                    {product.author.photoUrl ? (
                                        <Image
                                            src={product.author.photoUrl}
                                            alt={product.author.fullName}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                                            <span className="text-primary text-sm font-medium">
                                                {product.author.fullName.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-sm text-text-dark truncate">
                                    {product.author.fullName}
                                </p>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 truncate text-text hover:text-primary transition-colors">
                                {product.title}
                            </h3>
                            <p className="text-lg font-bold text-primary mb-3">
                                {formatPrice(product.price)}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mt-4">
                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                                    {product.status}
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {product.category}
                                </span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border">
                                <p className="text-sm text-text-dark">
                                    Created: {formatDate(product.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Product Details Modal */}
            <dialog id="product_details_modal" className="modal">
                <div className="modal-box max-w-4xl bg-background p-0 rounded-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {selectedProduct && (
                        <div className="relative">
                            {/* Modal Header with Image - Fixed at top */}
                            <div className="sticky top-0 z-10 w-full h-96">
                                <Image
                                    src={selectedProduct.image}
                                    alt={selectedProduct.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <h2 className="text-3xl font-bold mb-2">{selectedProduct.title}</h2>
                                    <p className="text-2xl font-bold text-primary-300">
                                        {formatPrice(selectedProduct.price)}
                                    </p>
                                </div>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-8 space-y-8">
                                {/* Author and Status Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-card p-6 rounded-xl">
                                        <div className="flex items-center gap-2 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            <h3 className="text-lg font-semibold">Author</h3>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-16 h-16">
                                                {selectedProduct.author.photoUrl ? (
                                                    <Image
                                                        src={selectedProduct.author.photoUrl}
                                                        alt={selectedProduct.author.fullName}
                                                        fill
                                                        className="rounded-full object-cover ring-2 ring-primary/20"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center">
                                                        <span className="text-primary text-xl font-medium">
                                                            {selectedProduct.author.fullName.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">{selectedProduct.author.fullName}</p>
                                                <p className="text-gray-500">{selectedProduct.author.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-card p-6 rounded-xl">
                                        <div className="flex items-center gap-2 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <h3 className="text-lg font-semibold">Product Status</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                                                    <span className="font-medium">Status:</span>
                                                </div>
                                                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                                                    {selectedProduct.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                                    <span className="font-medium">Category:</span>
                                                </div>
                                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {selectedProduct.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-card p-6 rounded-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Description</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {selectedProduct.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                <div className="bg-card p-6 rounded-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Tags</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProduct.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 bg-background text-text 
                                                         px-4 py-1.5 rounded-full text-sm hover:bg-primary hover:text-white 
                                                         transition-colors duration-300 cursor-default"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                                                </svg>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="bg-card p-6 rounded-xl">
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <h3 className="text-lg font-semibold">Additional Information</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div className="space-y-3">
                                            <p className="flex items-center gap-2 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">Created:</span>
                                                {formatDate(selectedProduct.createdAt)}
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">Updated:</span>
                                                {formatDate(selectedProduct.updatedAt)}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="flex items-center gap-2 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L12 14.229l-2.419 2.585A1 1 0 018 16V4z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">Product ID:</span>
                                                <code className="bg-background px-2 py-1 rounded">
                                                    {selectedProduct.id}
                                                </code>
                                            </p>
                                            <p className="flex items-center gap-2 text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                                </svg>
                                                <span className="font-medium">Slug:</span>
                                                <code className="bg-background px-2 py-1 rounded">
                                                    {selectedProduct.slug}
                                                </code>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions - Fixed at bottom */}
                            <div className="sticky bottom-0 left-0 right-0 bg-background p-4 border-t border-border">
                                <div className="flex justify-end gap-4">
                                    <form method="dialog">
                                        <button className="px-6 py-2.5 rounded-full bg-card hover:bg-card/80 
                                                       text-text transition-colors duration-300">
                                            Close
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-background rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Konfirmasi Penghapusan</h3>
                        <p className="mb-6">Apakah Anda yakin ingin menghapus produk &quot;{productToDelete?.title}&quot;?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-text-dark hover:text-text transition-colors"
                                disabled={isDeleting}
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Menghapus...
                                    </>
                                ) : (
                                    'Hapus'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}