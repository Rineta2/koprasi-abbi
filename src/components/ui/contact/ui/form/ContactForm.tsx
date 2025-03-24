"use client"

import { useState } from 'react'

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { contactFormSchema, type ContactFormData } from "@/components/ui/contact/lib/validation"

import { motion } from 'framer-motion'

import { useContactSubmit } from "@/components/ui/contact/lib/useContact"

import { FormInput } from "@/components/ui/contact/ui/form/FormInput"

import { FormTextarea } from "@/components/ui/contact/ui/form/FormTextArea"

export function ContactForm() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    });

    const { onSubmit } = useContactSubmit({ setIsLoading, reset });

    return (
        <div className='bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 backdrop-blur-xl'>
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <FormInput
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    {...register("name")}
                    error={errors.name}
                />

                <FormInput
                    label="Email"
                    type="email"
                    placeholder="Masukkan email"
                    {...register("email")}
                    error={errors.email}
                />

                <FormInput
                    label="Nomor Telepon"
                    type="tel"
                    placeholder="Masukkan nomor telepon"
                    {...register("phone")}
                    error={errors.phone}
                />

                <FormTextarea
                    label="Pesan"
                    placeholder="Tulis pesan Anda"
                    {...register("message")}
                    error={errors.message}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary w-full bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl"
                >
                    {isLoading ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Mengirim...
                        </>
                    ) : (
                        'Kirim'
                    )}
                </button>
            </motion.form>
        </div>
    )
}