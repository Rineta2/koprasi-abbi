"use client"

import React, { useEffect, useState } from 'react'

import { database } from '@/utils/firebase'

import { ref, onValue, update } from 'firebase/database'

import { FaEye } from 'react-icons/fa'

import { Contact } from "@/hooks/dashboard/super-admins/contact/lib/contact"

export default function ContactLayout() {
    const [contacts, setContacts] = useState<Contact[]>([])

    useEffect(() => {
        // Mengubah untuk mengambil semua kontak
        const contactsRef = ref(database, process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS)

        // Mengambil data realtime tanpa filter
        const unsubscribe = onValue(contactsRef, (snapshot) => {
            const contactsData: Contact[] = []
            snapshot.forEach((childSnapshot) => {
                contactsData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            setContacts(contactsData)
        })

        return () => unsubscribe()
    }, [])

    // Fungsi untuk membuka modal
    const handleViewContact = (contactId: string) => {
        const modal = document.getElementById(`modal_${contactId}`) as HTMLDialogElement
        if (modal) {
            modal.showModal()
        }
    }

    // Fungsi untuk mengupdate status
    const handleMarkAsRead = async (contactId: string) => {
        try {
            const contactRef = ref(database, `${process.env.NEXT_PUBLIC_COLLECTIONS_CONTACTS}/${contactId}`)
            await update(contactRef, {
                status: 'read'
            })
            // Tutup modal setelah update
            const modal = document.getElementById(`modal_${contactId}`) as HTMLDialogElement
            if (modal) {
                modal.close()
            }
        } catch (error) {
            console.error('Error updating status:', error)
        }
    }

    const handleReply = (email: string) => {
        window.location.href = `mailto:${email}`
    }

    return (
        <section className='min-h-full px-0 sm:px-2'>
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-md border border-slate-100 backdrop-blur-sm bg-white/80">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2'>
                            Contact Messages
                        </h1>
                        <p className='text-slate-500 text-sm sm:text-base'>View and manage unread contact messages</p>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl 
                        hover:bg-slate-700 transition-all duration-300 shadow-sm hover:scale-105">
                        Back to Dashboard
                    </button>
                </div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {contacts.map((contact) => (
                    <div key={contact.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 border border-slate-100 hover:border-slate-200 hover:scale-[1.02]">
                        <div className="flex justify-between items-start">
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-base sm:text-lg text-slate-800">{contact.name}</h3>
                                    {contact.status === 'unread' && (
                                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-600 flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="p-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">📧</span>
                                        {contact.email}
                                    </p>
                                    <p className="text-slate-600 flex items-center gap-2 text-xs sm:text-sm">
                                        <span className="p-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">📱</span>
                                        {contact.phone}
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-400">
                                    {new Date(contact.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <button
                                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-300 hover:scale-110"
                                onClick={() => handleViewContact(contact.id)}
                            >
                                <FaEye size={18} />
                            </button>
                        </div>

                        {/* Modal dengan styling yang lebih modern */}
                        <dialog id={`modal_${contact.id}`} className="modal">
                            <div className="modal-box max-w-3xl bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/50">
                                {/* Header */}
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
                                        Message Details
                                    </h3>
                                    <form method="dialog">
                                        <button className="btn btn-circle btn-ghost text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                                <div className="space-y-6">
                                    {/* Info Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="p-2 bg-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">👤</span>
                                                <p className="text-xs text-slate-500">Sender Name</p>
                                            </div>
                                            <p className="text-sm sm:text-base text-slate-700 font-medium pl-12">{contact.name}</p>
                                        </div>

                                        <div className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="p-2 bg-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">📧</span>
                                                <p className="text-xs text-slate-500">Contact Email</p>
                                            </div>
                                            <p className="text-sm sm:text-base text-slate-700 font-medium pl-12">{contact.email}</p>
                                        </div>

                                        <div className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="p-2 bg-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">📱</span>
                                                <p className="text-xs text-slate-500">Phone Number</p>
                                            </div>
                                            <p className="text-sm sm:text-base text-slate-700 font-medium pl-12">{contact.phone}</p>
                                        </div>

                                        <div className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-2xl hover:shadow-md transition-all duration-300">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="p-2 bg-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">🕒</span>
                                                <p className="text-xs text-slate-500">Received On</p>
                                            </div>
                                            <p className="text-sm sm:text-base text-slate-700 font-medium pl-12">
                                                {new Date(contact.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Message Content */}
                                    <div className="group bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="p-2 bg-slate-100 rounded-full group-hover:scale-110 transition-transform duration-300">💬</span>
                                            <p className="text-sm text-slate-500">Message Content</p>
                                        </div>
                                        <p className="text-sm sm:text-base text-slate-700 whitespace-pre-wrap pl-12 leading-relaxed">
                                            {contact.message}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="modal-action flex-wrap gap-3 mt-8">
                                    <button
                                        onClick={() => handleReply(contact.email)}
                                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl 
                                            hover:from-blue-700 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Reply Message
                                    </button>
                                    {contact.status === 'unread' && (
                                        <button
                                            onClick={() => handleMarkAsRead(contact.id)}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl 
                                                hover:from-slate-900 hover:to-slate-800 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Mark as Read
                                        </button>
                                    )}
                                </div>
                            </div>
                            <form method="dialog" className="modal-backdrop bg-slate-900/20 backdrop-blur-sm">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                ))}
            </div>
        </section>
    )
}
