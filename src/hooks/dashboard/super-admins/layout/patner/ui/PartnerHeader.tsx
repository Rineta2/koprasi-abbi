import { motion } from 'framer-motion'

import { headerVariants } from '@/hooks/dashboard/super-admins/layout/patner/lib/animation'

import { PartnerHeaderProps } from '@/hooks/dashboard/super-admins/layout/patner/lib/partner'

export const PartnerHeader = ({ onCreateClick }: PartnerHeaderProps) => {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="bg-gradient-to-r from-card to-card/80 backdrop-blur-sm rounded-3xl border p-8 mb-8 border-gray-100/10 dark:border-gray-800/20 shadow-lg shadow-primary/5"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-2">
                    <h1 className='text-3xl sm:text-4xl font-bold bg-gradient-to-r from-text to-primary bg-clip-text text-transparent'>
                        Partner
                    </h1>
                    <p className='text-text-dark/80 text-lg'>Manage and organize your partner content</p>
                </div>

                <button
                    onClick={onCreateClick}
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
    )
}