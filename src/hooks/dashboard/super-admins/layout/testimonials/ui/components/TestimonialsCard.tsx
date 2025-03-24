import Image from 'next/image'

import { FaStar } from 'react-icons/fa'

import { TestimonialCardProps } from '@/hooks/dashboard/super-admins/layout/testimonials/lib/Testimonials'

export const TestimonialCard = ({ content, onDelete, onEdit }: TestimonialCardProps) => {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
            <div className="relative w-full h-72">
                <Image
                    src={content.imageUrl || '/placeholder-image.jpg'}
                    alt={content.name}
                    fill
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="p-6">
                <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            className={star <= content.rating ? "text-yellow-400" : "text-gray-300"}
                            size={20}
                        />
                    ))}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">{content.description}</p>

                <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-800">{content.name}</h3>
                    <p className="text-gray-500 text-sm">{content.position}</p>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={() => content.id && onDelete(content.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => onEdit(content)}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}