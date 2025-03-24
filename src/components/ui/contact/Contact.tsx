"use client"

import React, { useState } from 'react'

import Link from 'next/link'

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

import Testimonials from "@/components/ui/contact/Testimonials"

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { contactFormSchema, type ContactFormData } from "@/components/ui/contact/lib/validation";

import { database } from '@/utils/firebase';

import { ref, push, get, query, orderByChild, equalTo } from 'firebase/database';

import toast from 'react-hot-toast';

const socialMedia = [
    {
        id: 1,
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=10008888888888888',
        icon: <FaFacebookF />
    },
    {
        id: 2,
        label: 'Instagram',
        href: 'https://www.instagram.com/profile.php?id=10008888888888888',
        icon: <FaInstagram />
    },
    {
        id: 3,
        label: 'Tiktok',
        href: 'https://www.tiktok.com/profile.php?id=10008888888888888',
        icon: <FaTiktok />
    }
]

export default function Contact() {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema)
    });

    const checkEmailExists = async (email: string) => {
        try {
            const emailQuery = query(
                ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS),
                orderByChild('email'),
                equalTo(email)
            );

            const snapshot = await get(emailQuery);
            return snapshot.exists();
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const onSubmit = async (data: ContactFormData) => {
        try {
            setIsLoading(true);

            const emailExists = await checkEmailExists(data.email);

            if (emailExists) {
                toast.error('Email ini sudah pernah mengirim pesan sebelumnya.');
                return;
            }

            const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS);

            const contactData = {
                ...data,
                timestamp: new Date().toISOString(),
                status: 'unread'
            };

            await push(contactsRef, contactData);

            reset();
            toast.success('Pesan Anda telah berhasil dikirim!');
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='relative py-16 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100' id='contact'>
            <div className="absolute inset-0 z-0">
                <svg className="absolute right-0 top-0 h-64 w-64 opacity-20" viewBox="0 0 184 184" xmlns="http://www.w3.org/2000/svg">
                    <path d="M182 184a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 40a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM22 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM2 144a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-60a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
                </svg>
                <svg className="absolute left-0 bottom-0 h-64 w-64 opacity-20 transform rotate-180" viewBox="0 0 184 184" xmlns="http://www.w3.org/2000/svg">
                    <path d="M182 184a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm-20 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-20a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor" />
                </svg>
            </div>

            <div className='container px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl relative z-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    <div className='space-y-8'>
                        <h3 className='text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight'>
                            Tim kami sangat berdedikasi untuk membantu Anda menjawab pertanyaan.
                        </h3>
                        <p className='text-lg text-gray-600 leading-relaxed'>
                            Cukup tuliskan &apos;hai&apos; melalui formulir dan tim kami akan menghubungi Anda di hari yang berikutnya.
                        </p>

                        <div className='flex gap-6'>
                            {socialMedia.map((item) => (
                                <Link
                                    href={item.href}
                                    key={item.id}
                                    className='text-gray-600 text-xl'
                                >
                                    {item.icon}
                                </Link>
                            ))}
                        </div>

                        <Testimonials />
                    </div>

                    <div className='bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl p-8 backdrop-blur-xl'>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">Nama Lengkap</span>
                                </label>
                                <input
                                    {...register("name")}
                                    type="text"
                                    placeholder="Masukkan nama lengkap"
                                    className="input w-full text-white bg-gray-50/50 dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                                />
                                {errors.name && (
                                    <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">Email</span>
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="Masukkan email"
                                    className="input w-full bg-gray-50/50 text-white dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                                />
                                {errors.email && (
                                    <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">Nomor Telepon</span>
                                </label>
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    placeholder="Masukkan nomor telepon"
                                    className="input w-full bg-gray-50/50 text-white dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                                />
                                {errors.phone && (
                                    <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
                                )}
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium text-gray-700 dark:text-gray-200">Pesan</span>
                                </label>
                                <textarea
                                    {...register("message")}
                                    placeholder="Tulis pesan Anda"
                                    className="textarea w-full h-32 resize-none bg-gray-50/50 text-white dark:bg-gray-700/50 border-0 border-b-2 border-gray-200 dark:border-gray-600 rounded-none focus:border-primary focus:ring-0 focus:bg-white dark:focus:bg-transparent transition-all duration-300 ease-in-out placeholder:text-gray-400 focus:placeholder:text-gray-500"
                                ></textarea>
                                {errors.message && (
                                    <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>
                                )}
                            </div>

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
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
