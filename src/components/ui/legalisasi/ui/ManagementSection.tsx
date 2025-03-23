import { motion } from 'framer-motion'

import { ManagementSectionProps } from '@/components/ui/legalisasi/lib/schema'

export default function ManagementSection({ data }: ManagementSectionProps) {
    return (
        <div>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-600'>
                    Management
                </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {Object.entries(data.management).map(([role, name]) => (
                    <div key={role} className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 group transform hover:-translate-y-1'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4 className='text-md font-medium text-gray-600 mb-3 group-hover:text-primary transition-colors uppercase'>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                            </h4>
                            <p className='font-semibold text-gray-800 text-lg'>{name}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}