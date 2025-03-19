import React from 'react';

import { DeleteModalProps } from '@/hooks/dashboard/super-admins/layout/home/lib/home';

export const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, isSubmitting, onClose }) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-text/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-background rounded-2xl shadow-xl border border-border max-w-md w-full p-6">
                    <h3 className="text-lg font-semibold text-text mb-4">Confirm Delete</h3>
                    <p className="text-text-dark mb-6">
                        Are you sure you want to delete this content? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-text-dark hover:bg-card rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onDelete}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
};