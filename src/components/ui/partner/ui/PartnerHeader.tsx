import { motion } from 'framer-motion';

export default function PartnerHeader() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16 text-center max-w-2xl mx-auto"
        >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold 
                bg-gradient-to-r from-primary via-primary/90 to-primary/80 
                bg-clip-text text-transparent
                tracking-tight mb-3">
                Bekerja Sama Dengan
            </h2>
            <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-primary to-primary/30 
                rounded-full mx-auto"></div>
            <p className="text-text/70 mt-4 text-sm md:text-base max-w-xl mx-auto">
                Kami bermitra dengan berbagai organisasi untuk memberikan layanan terbaik bagi anggota kami
            </p>
        </motion.div>
    );
}