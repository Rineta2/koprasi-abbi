import React from 'react'

import Image from 'next/image'

import logo from "@/base/assets/logo/logo.png"

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b bg-[#1091cc]/10 text-text">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Company Info */}
                    <div className="space-y-6 transition-all duration-300 p-4 rounded-xl hover:bg-background/50 backdrop-blur-sm">
                        <Image
                            src={logo}
                            alt="Company Logo"
                            width={150}
                            height={50}
                            className="mb-4"
                        />
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            KOPERASI ABBI
                        </h3>
                        <p className="text-sm leading-relaxed text-text/80 hover:text-text transition-colors">
                            Mewujudkan Kesejahteraan Bersama Melalui Inovasi Digital dan Stabilitas Keuangan
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-primary hover:text-secondary transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <i className="fab fa-facebook text-2xl"></i>
                            </a>
                            <a href="#" className="text-primary hover:text-secondary transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <i className="fab fa-twitter text-2xl"></i>
                            </a>
                            <a href="#" className="text-primary hover:text-secondary transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6 transition-all duration-300 p-4 rounded-xl hover:bg-background/50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Tentang Kami
                                </a>
                            </li>
                            <li>
                                <a href="#legalitas" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Legalitas Company
                                </a>
                            </li>
                            <li>
                                <a href="#register" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Pendaftaran Anggota
                                </a>
                            </li>
                            <li>
                                <a href="#reward" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Reward
                                </a>
                            </li>
                            <li>
                                <a href="#artikel" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Artikel
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="group flex items-center text-text/80 hover:text-primary transition-all duration-300 hover:translate-x-2">
                                    <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                                    Kontak Kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6 transition-all duration-300 p-4 rounded-xl hover:bg-background/50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                                <i className="fas fa-map-marker-alt text-primary group-hover:text-secondary transition-colors"></i>
                                <span className="text-text/80 group-hover:text-text transition-colors">Jakarta Raya</span>
                            </li>
                            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                                <i className="fas fa-phone text-primary group-hover:text-secondary transition-colors"></i>
                                <span className="text-text/80 group-hover:text-text transition-colors">+1 234 567 890</span>
                            </li>
                            <li className="flex items-center space-x-3 group hover:translate-x-2 transition-transform duration-300">
                                <i className="fas fa-envelope text-primary group-hover:text-secondary transition-colors"></i>
                                <span className="text-text/80 group-hover:text-text transition-colors">spacedigitalia@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6 transition-all duration-300 p-4 rounded-xl hover:bg-background/50 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Newsletter
                        </h3>
                        <p className="text-sm text-text/80">Bergabunglah dengan newsletter kami untuk mendapatkan informasi terbaru, tips keuangan, dan peluang investasi menarik.</p>
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 placeholder-text/50"
                            />
                            <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:-translate-y-1 transition-all duration-300 font-medium text-background">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-text/10 mt-12 pt-8 text-sm text-center">
                    <p className="text-text/60">&copy; 2025 Space Digitalia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
