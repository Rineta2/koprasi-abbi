"use client";

import { useAuth } from "@/router/context/AuthContext";

import { Role } from "@/router/context/interface/auth";

import { Fragment, useEffect, useState } from "react";

import Header from "@/components/layout/header/admins/Header"

import { ThemeProvider } from "@/router/context/ThemaProvider";

import ThemeToggle from '@/components/layout/header/hooks/ThemaToggle'

export default function SuperAdminsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { hasRole, user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isMessagesOpen, setIsMessagesOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        if (!user || !hasRole(Role.ADMIN)) {
            window.location.href = '/';
            return;
        }
        setIsAuthorized(true);
    }, [hasRole, user]);

    // Function to handle dropdown toggles
    const toggleMessages = () => {
        setIsMessagesOpen(!isMessagesOpen);
        setIsNotificationsOpen(false); // Close notifications when opening messages
    };

    const toggleNotifications = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        setIsMessagesOpen(false); // Close messages when opening notifications
    };

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.messages-dropdown') && !target.closest('.notifications-dropdown')) {
            setIsMessagesOpen(false);
            setIsNotificationsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!isAuthorized) {
        return null;
    }

    return (
        <Fragment>
            <ThemeProvider>
                <div className="flex min-h-screen bg-background transition-colors duration-200">
                    {/* Sidebar */}
                    <div
                        className={`
                        fixed inset-0 lg:relative lg:inset-auto
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:translate-x-0 transition-all duration-300 ease-in-out
                        w-72 lg:w-[280px] z-30 border-r border-border/40 
                        bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
                        dark:bg-background/90 dark:border-border/30
                    `}
                    >
                        <Header onSidebarToggle={setIsSidebarOpen} />
                    </div>

                    {/* Overlay */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-background/80 dark:bg-background/90 backdrop-blur-sm lg:hidden z-20 animate-in fade-in duration-200"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Main Content */}
                    <div className="flex-1 relative w-full lg:w-[calc(100%-280px)]">
                        {/* Top Navigation Bar */}
                        <div className="sticky top-0 z-20 h-16 
                            bg-background/95 dark:bg-background/90 
                            backdrop-blur supports-[backdrop-filter]:bg-background/60
                            border-b border-border/40 dark:border-border/30
                            flex items-center justify-between px-4 lg:px-6
                            transition-colors duration-200">
                            {/* Left side */}
                            <div className="flex items-center gap-4">
                                <button
                                    className="lg:hidden p-2 hover:bg-muted rounded-lg transition-all duration-200
                                    active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring"
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                >
                                    <svg
                                        className="w-6 h-6 text-foreground"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d={isSidebarOpen
                                                ? "M6 18L18 6M6 6l12 12"
                                                : "M4 6h16M4 12h16M4 18h16"
                                            }
                                        />
                                    </svg>
                                </button>
                                <div className="relative hidden sm:block">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-[300px] h-10 px-4 text-sm rounded-lg 
                                        bg-muted dark:bg-muted/50 
                                        border-none focus:outline-none focus:ring-2 focus:ring-ring
                                        placeholder:text-muted-foreground/70
                                        transition-all duration-200"
                                    />
                                    <svg
                                        className="w-5 h-5 text-muted-foreground/70 absolute right-4 top-1/2 -translate-y-1/2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Right side - Messages, Notifications, and Theme Toggle */}
                            <div className="flex items-center gap-2">
                                {/* Messages Dropdown */}
                                <div className="relative messages-dropdown">
                                    <button
                                        onClick={toggleMessages}
                                        className={`relative p-2 rounded-lg transition-all duration-200 active:scale-95
                                            ${isMessagesOpen ? 'bg-muted' : 'hover:bg-muted'}`}
                                    >
                                        <svg
                                            className={`w-6 h-6 transition-colors
                                                ${isMessagesOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                            />
                                        </svg>
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-background animate-pulse"></span>
                                    </button>

                                    {isMessagesOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-80 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                                            <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                                                <div className="p-4 border-b border-border">
                                                    <h3 className="font-semibold">Messages</h3>
                                                    <p className="text-sm text-muted-foreground">You have 3 unread messages</p>
                                                </div>
                                                <div className="max-h-[300px] overflow-y-auto">
                                                    {/* Message Items */}
                                                    <div className="p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0">
                                                        <div className="flex gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                                <span className="text-primary font-medium">JD</span>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm">John Doe</p>
                                                                <p className="text-sm text-muted-foreground truncate">Hey, I just wanted to check in about the project...</p>
                                                                <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
                                                            </div>
                                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-muted/50 border-t border-border">
                                                    <a href="/messages" className="text-sm text-primary hover:underline block text-center">
                                                        View all messages
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Notifications Dropdown */}
                                <div className="relative notifications-dropdown">
                                    <button
                                        onClick={toggleNotifications}
                                        className={`relative p-2 rounded-lg transition-all duration-200 active:scale-95
                                            ${isNotificationsOpen ? 'bg-muted' : 'hover:bg-muted'}`}
                                    >
                                        <svg
                                            className={`w-6 h-6 transition-colors
                                                ${isNotificationsOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            />
                                        </svg>
                                        <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full ring-2 ring-background animate-pulse"></span>
                                    </button>

                                    {isNotificationsOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-96 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
                                            <div className="bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                                                <div className="p-4 border-b border-border">
                                                    <h3 className="font-semibold">Notifications</h3>
                                                    <p className="text-sm text-muted-foreground">You have 5 unread notifications</p>
                                                </div>
                                                <div className="max-h-[400px] overflow-y-auto">
                                                    {/* Notification Items */}
                                                    <div className="p-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0">
                                                        <div className="flex gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M12 4v16m8-8H4" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm">New User Registration</p>
                                                                <p className="text-sm text-muted-foreground">A new user has registered to the platform.</p>
                                                                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                                                            </div>
                                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                                        </div>
                                                    </div>

                                                    <div className="p-3 hover:bg-muted/50 transition-colors border-b border-border">
                                                        <div className="flex gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm">System Alert</p>
                                                                <p className="text-sm text-muted-foreground">Server load is approaching 90%.</p>
                                                                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                                                            </div>
                                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-3 bg-muted/50 border-t border-border">
                                                    <a href="/notifications" className="text-sm text-primary hover:underline block text-center">
                                                        View all notifications
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <ThemeToggle />
                            </div>
                        </div>

                        <main>
                            {children}
                        </main>
                    </div>
                </div>
            </ThemeProvider>
        </Fragment>
    );
} 