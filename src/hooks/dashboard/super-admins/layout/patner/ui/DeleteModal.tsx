import { DeleteModalProps } from '@/hooks/dashboard/super-admins/layout/patner/lib/partner'

export const DeleteModal = ({ onConfirm, editingId }: DeleteModalProps) => {
    return (
        <dialog id="delete_modal" className="modal">
            <div className="fixed inset-0 bg-text/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-background rounded-2xl border border-border shadow-xl max-w-md w-full p-6">
                    <h3 className="text-xl font-bold text-text mb-2">Konfirmasi Penghapusan</h3>
                    <p className="text-text-dark mb-6">
                        Apakah Anda yakin ingin menghapus konten ini? Aksi ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 text-text-dark hover:bg-card rounded-lg transition-colors duration-200"
                            onClick={() => {
                                const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                modal?.close()
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                            onClick={() => editingId && onConfirm(editingId)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    )
}