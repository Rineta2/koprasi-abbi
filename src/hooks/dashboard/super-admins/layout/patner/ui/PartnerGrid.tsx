import { motion } from 'framer-motion'

import Image from 'next/image'

import { containerVariants, cardVariants } from '@/hooks/dashboard/super-admins/layout/patner/lib/animation'

import { PartnerGridProps } from '@/hooks/dashboard/super-admins/layout/patner/lib/partner'
import { PartnerContent } from '@/hooks/dashboard/super-admins/layout/patner/lib/partner'

export const PartnerGrid = ({ contents, onEdit, onDelete }: PartnerGridProps) => {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
            {contents.map((content: PartnerContent) => (
                <motion.div
                    key={content.id}
                    variants={cardVariants}
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                    className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                    <motion.div
                        className="relative aspect-video w-full overflow-hidden"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Image
                            src={content.imageUrl}
                            alt={"partner"}
                            className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
                            fill
                            quality={100}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                    </motion.div>

                    <motion.div className="p-4 sm:p-5">
                        <motion.div className="flex items-center justify-end gap-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onEdit(content)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Edit
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onDelete(content)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    )
}