import Image from 'next/image'

import { ContentModalProps } from '@/hooks/dashboard/super-admins/layout/patner/lib/partner'

export const ContentModal = ({
    isEditing,
    formData,
    setFormData,
    selectedImage,
    setSelectedImage,
    onSubmit,
    isSubmitting,
    onCancel
}: ContentModalProps) => {
    return (
        <dialog id="content_modal" className="modal">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-card rounded-2xl max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-text">
                                    {isEditing ? 'Edit Content' : 'Create New Content'}
                                </h3>
                                <p className="text-sm text-text-dark">
                                    Fill in the information below to {isEditing ? 'update' : 'create'} your content
                                </p>
                            </div>

                            <button
                                onClick={onCancel}
                                className="p-2 hover:bg-background-dark rounded-xl transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form method="dialog" onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit()
                        }} className="space-y-8">
                            {/* Image Upload Section */}
                            <div className="w-full max-w-2xl mx-auto">
                                {/* Image Preview */}
                                {(selectedImage || formData.imageUrl) ? (
                                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-background-dark group">
                                        <Image
                                            src={selectedImage ? URL.createObjectURL(selectedImage) : formData.imageUrl}
                                            alt="Content preview"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                        {/* Delete Image Button */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedImage(null)
                                                setFormData({ ...formData, imageUrl: '' })
                                            }}
                                            className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    /* Upload Input */
                                    <div className="flex items-center justify-center w-full">
                                        <label className="w-full flex flex-col items-center px-4 py-6 bg-card rounded-xl border-2 border-border border-dashed cursor-pointer hover:bg-card-hover transition-colors duration-200">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-10 h-10 mb-3 text-text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <p className="mb-2 text-sm text-text-dark"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-text-dark">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) {
                                                        setSelectedImage(file)
                                                    }
                                                }}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 pt-6 border-t border-border">
                                <button
                                    type="button"
                                    className="px-5 py-2.5 text-text hover:bg-background-dark rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                    disabled={isSubmitting}
                                    onClick={onCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving Changes...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{isEditing ? 'Save Changes' : 'Create'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    )
}