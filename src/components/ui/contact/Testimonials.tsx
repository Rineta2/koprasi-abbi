"use client"

import React, { useState, useEffect } from 'react'

import { TestimonialType } from "@/components/ui/contact/lib/schema"

import { FetchTestimonials } from "@/components/ui/contact/lib/FetchTestimonials"

import TestimonialsSkeleton from "@/components/ui/contact/TestimonialsSkeleton"

import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import { FaStar } from "react-icons/fa";

import Image from "next/image"

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchTestimonials((newTestimonials) => {
            setTestimonials(newTestimonials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <TestimonialsSkeleton />;
    }
    return (
        <Swiper
            pagination={{
                dynamicBullets: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            effect="fade"
            speed={1000}
            grabCursor={true}
            centeredSlides={true}
            spaceBetween={10}
            loop={true}
            modules={[Autoplay]}
            className="w-full max-w-7xl mx-auto px-6 py-16 mt-10"
        >
            {
                testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} className="pb-14">
                        <div className='flex flex-col gap-6 bg-white dark:bg-gray-900 rounded-3xl p-8'>
                            <div className='flex gap-2 items-center'>
                                {
                                    Array.from({ length: testimonial.rating }).map((_, index) => (
                                        <FaStar key={index} className='text-blue-500 text-2xl' />
                                    ))
                                }
                            </div>
                            <p className='text-base md:text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-100 font-light'>
                                &quot;{testimonial.description}&quot;
                            </p>
                            <div className='flex gap-5 items-center mt-2'>
                                <div className='relative w-20 h-20 md:w-24 md:h-24'>
                                    <Image
                                        src={testimonial.imageUrl}
                                        alt={testimonial.name}
                                        fill
                                        className='rounded-2xl object-cover border border-gray-200 dark:border-gray-800'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white'>
                                        {testimonial.name}
                                    </h3>
                                    <p className='text-sm md:text-base text-blue-500 dark:text-blue-400 font-medium'>
                                        {testimonial.position}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}
