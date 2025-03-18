import { Product } from '../lib/Product';
import { useProduct } from '../lib/FetchProduct';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';

interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
}

export default function ProductList({ products, onEdit }: ProductListProps) {
    const { deleteProduct } = useProduct();

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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="bg-card rounded-lg shadow-md overflow-hidden">
                    <div className="relative w-full h-48">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
                        <p className="text-lg font-bold text-primary mb-3">
                            {formatPrice(product.price)}
                        </p>

                        {/* Author Information */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative w-10 h-10">
                                {product.author.photoUrl ? (
                                    <Image
                                        src={product.author.photoUrl}
                                        alt={product.author.fullName}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                        <span className="text-gray-500 text-sm">
                                            {product.author.fullName.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-medium">{product.author.fullName}</p>
                                <p className="text-sm text-gray-500">{product.author.email}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                                {product.status}
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onEdit(product)}
                                    className="text-blue-500 hover:text-blue-700 transition-colors"
                                >
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                        Edit
                                    </span>
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id, product.image)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <span className="flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Delete
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Created Date */}
                        <div className="mt-3 text-sm text-text-dark">
                            Created: {formatDate(product.createdAt)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}