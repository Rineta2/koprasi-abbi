"use client";

import React, { useState } from "react";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/header/Header";

import Footer from "@/components/layout/footer/Footer";

import { Toaster } from "react-hot-toast";

import Script from "next/script";

import ModalPopup from "@/base/helper/model/ModalPopup"

const Pathname = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [showModal, setShowModal] = useState(true);

    // Check for all dashboard/admin routes
    const isAdminRoute = pathname?.includes("/dashboard") ||
        pathname?.includes("/auth") ||
        pathname?.includes("/payment") || false;

    return (
        <main>
            <Script
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
                strategy="lazyOnload"
            />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        style: {
                            background: '#22c55e',
                            color: '#fff',
                        },
                    },
                    error: {
                        style: {
                            background: '#ef4444',
                            color: '#fff',
                        },
                    },
                }}
            />
            {showModal && <ModalPopup onClose={() => setShowModal(false)} />}
            {!isAdminRoute && <Header />}
            {children}
            {!isAdminRoute && <Footer />}
        </main>
    );
};

export default Pathname;