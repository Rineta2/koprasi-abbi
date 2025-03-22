import { motion } from 'framer-motion';

import Image from 'next/image';

import { ImageSectionProps } from '@/components/ui/tentang-kami/lib/schema';

export function ImageSection({ imageUrl, title }: ImageSectionProps) {
    return (
        <motion.div
            className='lg:col-span-5 relative rounded-2xl overflow-hidden shadow-xl'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 z-10" />

            <div className="group relative overflow-hidden aspect-[4/3]">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>

            <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30 -z-0"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30 -z-0"></div>
        </motion.div>
    );
}