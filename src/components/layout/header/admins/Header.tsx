import React from 'react';

import { useAuth } from '@/router/context/AuthContext';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import Image from 'next/image';

import { menuItems } from "@/components/layout/header/admins/data/Header"

interface HeaderProps {
    onSidebarToggle: (isOpen: boolean) => void;
}

export default function Header({ onSidebarToggle }: HeaderProps) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    const handleLinkClick = () => {
        // Close sidebar on mobile when link is clicked
        if (onSidebarToggle) {
            onSidebarToggle(false);
        }
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
        if (normalizedHref === '/admins/dashboard') {
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
        <header className="h-full flex flex-col">
            {/* Close Button - Mobile Only */}
            <div className="absolute top-4 right-4 lg:hidden">
                <button
                    onClick={() => onSidebarToggle?.(false)}
                    className="p-2 rounded-lg hover:bg-muted/60 dark:hover:bg-muted/25
                             transition-colors duration-200 active:scale-95"
                >
                    <svg
                        className="w-5 h-5 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-border/40 dark:border-border/30">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Image
                            src={user?.photoURL || '/images/default-profile.png'}
                            alt="Profile"
                            width={48}
                            height={48}
                            className="rounded-full object-cover w-12 h-12 ring-2 ring-background"
                        />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-background"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium truncate">{user?.displayName}</p>
                        <p className="text-sm text-muted-foreground truncate">Super Admin</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 overflow-y-auto">
                <ul className="space-y-1.5">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            {!item.subItems ? (
                                <Link
                                    href={item.href}
                                    onClick={handleLinkClick}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg 
                                    transition-all duration-200 group
                                    ${isLinkActive(item.href)
                                            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/25'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ) : (
                                <>
                                    <button
                                        onClick={() => toggleDropdown(index)}
                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg 
                                        transition-all duration-200 group
                                        ${item.subItems?.some(subItem => isLinkActive(subItem.href))
                                                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/25'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/25'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="w-5 h-5" />
                                            <span className="text-sm font-medium">{item.label}</span>
                                        </div>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 
                                            ${activeDropdown === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-200 
                                    ${activeDropdown === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <ul className="mt-1 ml-4 space-y-1">
                                            {item.subItems.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <Link
                                                        href={subItem.href}
                                                        onClick={handleLinkClick}
                                                        className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200
                                                        ${isLinkActive(subItem.href)
                                                                ? 'text-primary font-medium bg-primary/10'
                                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60 dark:hover:bg-muted/25'
                                                            }`}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></span>
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
            <div className="p-4 border-t border-border/40 dark:border-border/30">
                <button
                    onClick={() => {
                        logout();
                        handleLinkClick();
                    }}
                    className="flex items-center justify-center gap-2 w-full p-2.5 rounded-lg
                    text-destructive hover:bg-destructive/10 active:bg-destructive/20
                    transition-all duration-200 group"
                >
                    <FiLogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </header>
    );
}