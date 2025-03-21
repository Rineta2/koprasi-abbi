import { motion } from 'framer-motion'

interface TransactionHeaderProps {
    onCreateClick: () => void;
}

export function TransactionHeader({ onCreateClick }: TransactionHeaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-white to-white/90 backdrop-blur-xl rounded-3xl border border-gray-100 p-6 md:p-8 shadow-xl"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                <div className="space-y-2">
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-primary bg-clip-text text-transparent'>
                        Transaction
                    </h1>
                    <p className='text-gray-600 text-base lg:text-lg'>Kelola dan organisir transaksi Anda</p>
                </div>

                <button
                    onClick={onCreateClick}
                    className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Create Transaction</span>
                </button>
            </div>
        </motion.div>
    )
}