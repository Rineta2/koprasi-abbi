import { Product } from '../lib/Product';
import { useProduct } from '../lib/FetchProduct';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';

interface ProductListProps {
    products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
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
                                    onClick={() => deleteProduct(product.id, product.image)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
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