import React from 'react';

import { StatusContent } from '@/hooks/dashboard/super-admins/product/status/lib/schema';

interface StatusModalProps {
    isEditing: boolean;
    isSubmitting: boolean;
    formData: StatusContent;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    onChange: (value: string) => void;
}

export const StatusModal: React.FC<StatusModalProps> = ({
    isEditing,
    isSubmitting,
    formData,
    onSubmit,
    onClose,
    onChange
}) => {
    return (
        <dialog id="status_modal" className="modal">
            <div className="fixed inset-0 bg-text/90 backdrop-blur-sm z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen p-4">
                    <div className="bg-background rounded-3xl shadow-2xl w-[90%] max-w-2xl p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-text">
                                    {isEditing ? 'Edit Status' : 'Add Status'}
                                </h3>
                                <p className="text-sm text-text-dark">
                                    {isEditing ? 'Update existing status' : 'Add a new status to your projects'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-card rounded-xl transition-colors duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form method="dialog" onSubmit={onSubmit} className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-text-dark">Status Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="w-full px-4 py-2.5 text-text bg-transparent border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                    placeholder="Enter status title"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-border">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-text hover:bg-card rounded-lg transition-all duration-200 font-medium"
                                    disabled={isSubmitting}
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg shadow-sm transition-all duration-200 disabled:opacity-50 font-medium flex items-center gap-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span>Saving...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Save</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </dialog>
    );
};