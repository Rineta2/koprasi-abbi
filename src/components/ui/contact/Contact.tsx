"use client"

import React from 'react'

import { ContactForm } from "@/components/ui/contact/ui/form/ContactForm"

import { SocialMediaLinks } from "@/components/ui/contact/ui/SocialMedia"

import { BackgroundDecorations } from "@/components/ui/contact/ui/Background"

import { motion } from 'framer-motion'

import Testimonials from "@/components/ui/contact/Testimonials"

export default function Contact() {
    return (
        <section className='relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100' id='contact'>
            <BackgroundDecorations />

            <div className='container px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-0 xl:gap-24 items-center'>
                    <div className='space-y-8'>
                        <motion.h3
                            className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Tim kami sangat berdedikasi untuk membantu Anda menjawab pertanyaan.
                        </motion.h3>

                        <motion.p
                            className='text-lg text-gray-600 leading-relaxed'
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Cukup tuliskan &apos;hai&apos; melalui formulir dan tim kami akan menghubungi Anda di hari yang berikutnya.
                        </motion.p>

                        <SocialMediaLinks />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Testimonials />
                        </motion.div>
                    </div>

                    <ContactForm />
                </div>
            </div>
        </section>
    )
}
