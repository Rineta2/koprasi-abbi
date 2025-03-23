import { motion } from 'framer-motion'

import { AddressSectionProps } from '@/components/ui/legalisasi/lib/schema'

export default function AddressSection({ data }: AddressSectionProps) {
    return (
        <div>
            <div className="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <h3 className='text-2xl md:text-3xl font-bold text-gray-600'>
                    Alamat
                </h3>
            </div>

            <div className='bg-white/50 backdrop-blur p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 group transform'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    <h4 className='text-md font-medium text-gray-600 mb-3 group-hover:text-primary transition-colors uppercase'>
                        Alamat
                    </h4>
                    <p className='font-semibold text-gray-800 text-lg leading-relaxed'>
                        {data.address.street} {data.address.village} {data.address.district} {data.address.city} {data.address.province} {data.address.postalCode}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}