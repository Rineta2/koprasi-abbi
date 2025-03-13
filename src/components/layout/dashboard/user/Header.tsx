import React from 'react';

import { useAuth } from '@/utils/context/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from '@/components/layout/dashboard/user/data/Header';

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
        if (normalizedHref === '/dashboard/user') {
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
        <header className="h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-0 right-0 flex justify-end p-4 lg:hidden">
                <button
                    onClick={() => onSidebarToggle(false)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 active:scale-95"
                >
                    <svg
                        className="w-6 h-6 text-gray-500 dark:text-gray-400"
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
            <div className="p-6 mt-2 mb-2 border-b border-slate-200/80 dark:border-gray-700/80">
                <div className="flex items-center gap-4 group">
                    {user?.photoURL ? (
                        <div className="relative">
                            <Image
                                src={user?.photoURL}
                                alt="Profile"
                                width={48}
                                height={48}
                                className="rounded-2xl object-cover w-12 h-12 ring-2 ring-slate-100 dark:ring-gray-700 transition-transform duration-200 group-hover:scale-105"
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="rounded-2xl object-cover w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center ring-2 ring-slate-100 dark:ring-gray-700 transition-transform duration-200 group-hover:scale-105">
                                <FaUser className="w-5 h-5 text-slate-500 dark:text-gray-400" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <p className="text-[15px] font-semibold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors duration-200">
                            {user?.fullName}
                        </p>
                        <span className="text-xs text-slate-500 dark:text-gray-400">
                            Online
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 active:scale-98 ${isLinkActive(item.href)
                                            ? 'bg-gradient-to-r from-primary to-primary/90 dark:from-primary-dark dark:to-primary-dark/90 text-white shadow-lg shadow-primary/25 dark:shadow-primary-dark/25'
                                            : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700/50 hover:text-slate-900 dark:hover:text-white'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 active:scale-98 ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                                ? 'bg-gradient-to-r from-primary to-primary/90 dark:from-primary-dark dark:to-primary-dark/90 text-white shadow-lg shadow-primary/25 dark:shadow-primary-dark/25'
                                                : 'text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-700/50 hover:text-slate-900 dark:hover:text-white'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
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

                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                        <ul className="mt-2 space-y-1 px-4">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`block py-2.5 px-4 text-sm rounded-lg transition-all duration-200 active:scale-98 ${isLinkActive(subItem.href)
                                                                ? 'text-primary dark:text-primary-dark font-medium bg-primary/10 dark:bg-primary-dark/10'
                                                                : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700/50'
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
            <div className="p-4 border-t border-slate-200/80 dark:border-gray-700/80">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick();
                    }}
                    className="flex items-center justify-center gap-2 w-full p-3 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 active:bg-red-100 dark:active:bg-red-500/20 transition-all duration-200 active:scale-98"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}