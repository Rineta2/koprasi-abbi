import React from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from '@/components/layout/dashboard/super-admins/data/Header';

import { FaUser } from "react-icons/fa";

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function UserHeader({ onSidebarToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        onSidebarToggle(false);
        // Also close any open dropdowns
        setActiveDropdown(null);
    };

    const isLinkActive = (href: string) => {
        // Remove trailing slashes for comparison
        const normalizedPathname = pathname?.replace(/\/$/, '') ?? '';
        const normalizedHref = href.replace(/\/$/, '');

        // For home page
        if (href === '/') {
            return pathname === href;
        }

        // For dashboard page
        if (normalizedHref === '/dashboard/super-admins') {
            return normalizedPathname === normalizedHref;
        }

        // For menu items with subItems, only highlight parent if exact match
        const menuItem = menuItems.find(item => item.href === href);
        if (menuItem?.subItems) {
            return normalizedPathname === normalizedHref;
        }

        // For submenu items or regular menu items without subItems
        return normalizedPathname.startsWith(normalizedHref);
    };

    const toggleDropdown = (index: number) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <header className="h-full flex flex-col bg-card shadow-lg">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-2 right-2 flex justify-end p-2 lg:hidden">
                <button
                    onClick={() => onSidebarToggle(false)}
                    className="p-2 hover:bg-background-dark rounded-full transition-all duration-300 hover:scale-105"
                >
                    <svg
                        className="w-5 h-5 text-text-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-5 mb-3 border-b border-border/40">
                <div className="flex items-center gap-4 group cursor-pointer hover:transform hover:translate-x-1 transition-all duration-300">
                    {user?.photoURL ? (
                        <div className="relative">
                            <Image
                                src={user?.photoURL}
                                alt="Profile"
                                width={50}
                                height={50}
                                className="rounded-xl object-cover w-[50px] h-[50px] ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card shadow-lg"></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="rounded-xl w-[50px] h-[50px] bg-background-dark flex items-center justify-center ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                                <FaUser className="w-5 h-5 text-text-dark" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card shadow-lg"></div>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <p className="text-base font-semibold text-text group-hover:text-primary transition-colors duration-300">
                            {user?.fullName}
                        </p>
                        <span className="text-xs font-medium text-text-dark/80">
                            Online
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${isLinkActive(item.href)
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-text-dark hover:bg-background-dark hover:text-text'
                                        }`}
                                >
                                    <item.icon className="w-[18px] h-[18px]" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-text-dark hover:bg-background-dark hover:text-text'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-[18px] h-[18px]" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === index ? 'max-h-100' : 'max-h-0'
                                        }`}>
                                        <ul className="mt-2 space-y-1 px-4">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block py-2.5 px-4 text-sm rounded-lg transition-all duration-300 hover:scale-[1.02] ${isLinkActive(subItem.href)
                                                            ? 'text-primary font-medium bg-primary/10 shadow-sm'
                                                            : 'text-text-dark hover:text-text hover:bg-background-dark'
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-border/40">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick();
                    }}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 active:bg-red-100 transition-all duration-300 hover:scale-[1.02]"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}