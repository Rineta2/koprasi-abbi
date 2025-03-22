import { motion } from 'framer-motion';

import { SectionHeaderProps } from '@/components/ui/tentang-kami/lib/schema';

export function SectionHeader({ title }: SectionHeaderProps) {
    return (
        <motion.div
            className="text-center mb-12 md:mb-16 lg:mb-20 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
                bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                bg-clip-text text-transparent'>
                {title}
            </h2>
            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                rounded-full mx-auto mb-6"></div>
        </motion.div>
    );
}