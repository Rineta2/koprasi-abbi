import { motion } from 'framer-motion';

import Image from 'next/image';

import { PartnerCardProps } from '@/components/ui/partner/lib/schema';

export default function PartnerCard({ partner }: PartnerCardProps) {
    return (
        <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(16,145,204,0.15)' }}
            className='group flex items-center justify-center mx-3 md:mx-5 lg:mx-6
                p-4 sm:p-6 md:p-8 
                h-28 sm:h-32 md:h-36 lg:h-40
                rounded-xl bg-white/[0.03]
                backdrop-blur-sm border border-primary/10
                transition-all duration-300 ease-out'
        >
            <div className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-full 
                relative flex items-center justify-center">
                <Image
                    src={partner.imageUrl}
                    alt={partner.id}
                    fill
                    className='object-contain opacity-85 group-hover:opacity-100
                        transition-all duration-300 scale-90 group-hover:scale-95
                        filter group-hover:brightness-110 group-hover:drop-shadow-md'
                    sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, (max-width: 1024px) 180px, 200px"
                    priority={true}
                />
            </div>
        </motion.div>
    );
}