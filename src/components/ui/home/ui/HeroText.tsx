import { motion } from 'framer-motion'

import Link from 'next/link'

import { IoIosArrowForward } from "react-icons/io";

import { HeroTextProps } from '@/components/ui/home/lib/schema'

export default function HeroText({ home }: HeroTextProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 1,
                type: "spring",
                stiffness: 100,
                damping: 20
            }}
            className='flex flex-col space-y-8 sm:space-y-10'
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    delay: 0.3,
                    duration: 0.6,
                    type: "spring"
                }}
                whileHover={{ scale: 1.05 }}
                className='inline-flex items-center gap-2 bg-white/50 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-2 sm:mb-4 w-fit hover:bg-white/80 transition-all duration-300 border border-slate-100 shadow-sm'
            >
                <span className='flex h-2 w-2 rounded-full bg-primary animate-pulse'></span>
                <p className='text-xs sm:text-sm font-medium text-primary'>{home.title}</p>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className='text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-balance bg-clip-text text-slate-800'
            >
                {home.primaryText}
                <span className='block mt-3 sm:mt-5 bg-gradient-to-r from-primary via-primary-dark to-primary bg-clip-text text-transparent animate-gradient relative'>
                    {home.text}
                    <svg className="absolute -bottom-8 left-0 w-32 h-3 text-primary/30" viewBox="0 0 100 12" fill="none">
                        <path d="M0 10C30 4 70 4 100 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='text-base sm:text-lg md:text-xl text-slate-600 max-w-xl capitalize leading-relaxed font-light'
            >
                {home.description}
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4"
            >
                <Link
                    href={home.button.link}
                    className='inline-flex items-center gap-2 sm:gap-3 bg-primary hover:bg-primary-dark text-white px-7 sm:px-9 py-4 sm:py-5 rounded-full text-sm sm:text-base font-medium transition-all duration-300 group w-fit shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.25)] '
                >
                    {home.button.text}
                    <div className='bg-white/10 p-1.5 rounded-full group-hover:bg-white/20 group-hover:translate-x-1.5 transition-all duration-300'>
                        <IoIosArrowForward className='text-lg' />
                    </div>
                </Link>
            </motion.div>
        </motion.div>
    )
}