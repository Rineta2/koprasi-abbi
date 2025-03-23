import { motion } from 'framer-motion'

import { RegistrationSectionProps } from '@/components/ui/legalisasi/lib/schema'

export default function RegistrationSection({ data }: RegistrationSectionProps) {
    return (
        <div>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-600'>
                    {data.registrationLabel}
                </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Object.entries(data.registrationNumbers).map(([key, value]) => (
                    <div key={key} className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 group transform hover:-translate-y-1'>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                        >
                            <h4 className='text-md font-medium text-gray-600 mb-3 group-hover:text-primary transition-colors uppercase'>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <p className='font-semibold text-gray-800 text-lg'>{value}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    )
}