import Image from 'next/image'
import { UserAccount, Product } from '../lib/transaction'

interface CreateTransactionModalProps {
    users: UserAccount[];
    products: Product[];
    selectedUser: string;
    selectedProduct: string;
    searchQuery: string;
    isCreatingTransaction: boolean;
    onUserSelect: (userId: string) => void;
    onProductSelect: (productId: string) => void;
    onSearchChange: (query: string) => void;
    onCreateTransaction: () => Promise<void>;
}

export function CreateTransactionModal({
    users,
    products,
    selectedUser,
    selectedProduct,
    searchQuery,
    isCreatingTransaction,
    onUserSelect,
    onProductSelect,
    onSearchChange,
    onCreateTransaction
}: CreateTransactionModalProps) {
    const filteredUsers = users.filter(account =>
        account.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredProducts = products.filter(product => {
        const selectedUserData = users.find(u => u.id === selectedUser);
        if (!selectedUserData) return false;
        return product.status === selectedUserData.accountType;
    });

    return (
        <dialog id="create_transaction_modal" className="modal">
            <div className="modal-box bg-background max-w-4xl">
                <h3 className="font-bold text-2xl mb-6">Create New Transaction</h3>

                <div className="form-control w-full">
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari user..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="input input-bordered w-full pl-10"
                            />
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>

                    <label className="label">
                        <span className="label-text font-medium">Pilih User</span>
                        <span className="label-text-alt text-gray-500">
                            {filteredUsers.length} user ditemukan
                        </span>
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((account) => (
                                <label
                                    key={account.id}
                                    className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:border-primary ${selectedUser === account.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="user"
                                        value={account.id}
                                        checked={selectedUser === account.id}
                                        onChange={(e) => onUserSelect(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                            {account.fullName.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{account.fullName}</h4>
                                            <p className="text-sm text-gray-500">@{account.username}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs ${account.accountType === 'premium'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {account.accountType}
                                        </span>
                                    </div>
                                    {selectedUser === account.id && (
                                        <div className="mt-4 pt-4 border-t border-dashed">
                                            <div className="space-y-2 text-sm text-gray-600">
                                                <p className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {account.email}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    {account.phoneNumber}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                                    </svg>
                                                    {account.referralCode}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-8 text-gray-500">
                                Tidak ada user yang ditemukan
                            </div>
                        )}
                    </div>

                    {/* Product Selection */}
                    {selectedUser && (
                        <div className="form-control w-full mt-6">
                            <label className="label">
                                <span className="label-text font-medium">Pilih Produk</span>
                                <span className="label-text-alt text-gray-500">
                                    {filteredProducts.length} produk tersedia
                                </span>
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-2">
                                {filteredProducts.map((product) => (
                                    <label
                                        key={product.id}
                                        className={`relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all duration-200 hover:border-primary ${selectedProduct === product.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="product"
                                            value={product.id}
                                            checked={selectedProduct === product.id}
                                            onChange={(e) => onProductSelect(e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="flex gap-4">
                                            <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900">{product.title}</h4>
                                                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-primary font-semibold">
                                                        Rp {product.price.toLocaleString('id-ID')}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${product.status === 'premium'
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        {product.status === 'premium' ? 'Premium' : 'Regular'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <form method="dialog">
                        <button className="btn btn-ghost">Batal</button>
                    </form>
                    <button
                        className="btn btn-primary"
                        disabled={!selectedUser || !selectedProduct || isCreatingTransaction}
                        onClick={onCreateTransaction}
                    >
                        {isCreatingTransaction ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Memproses...
                            </>
                        ) : (
                            'Buat Transaksi'
                        )}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}