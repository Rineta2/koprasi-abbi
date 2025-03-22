import { motion } from 'framer-motion';

import { FeatureItemProps } from '@/components/ui/tentang-kami/lib/schema';

export function FeatureItem({ feature, index }: FeatureItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="flex items-start space-x-3"
        >
            <div className="flex-shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
            </div>
            <p className="text-sm md:text-base font-medium text-text">{feature}</p>
        </motion.div>
    );
}