import Link from 'next/link'

import { motion } from 'framer-motion'

import { socialMedia } from '@/components/ui/contact/lib/schema'

export function SocialMediaLinks() {
    return (
        <motion.div
            className='flex gap-6'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            {socialMedia.map((item) => {
                const Icon = item.icon
                return (
                    <Link
                        href={item.href}
                        key={item.id}
                        className='text-gray-600 text-xl'
                    >
                        <Icon />
                    </Link>
                )
            })}
        </motion.div>
    )
}