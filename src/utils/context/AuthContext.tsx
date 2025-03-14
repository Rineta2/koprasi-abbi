import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { Role, UserAccount, AuthContextType } from '@/utils/context/interface/Auth';

import { auth, db } from '@/utils/firebase';

import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
} from 'firebase/auth';

import { doc, getDoc, setDoc, getDocs, query, where, collection } from 'firebase/firestore';

import toast from 'react-hot-toast';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserAccount | null>(null);
    const [loading, setLoading] = useState(true);
    const [showInactiveModal, setShowInactiveModal] = useState(false);
    const router = useRouter();

    const getDashboardUrl = (userRole: string) => {
        switch (userRole) {
            case Role.SUPER_ADMIN:
                return `/dashboard/super-admins`;
            case Role.ADMIN:
                return `/dashboard/admins`;
            case Role.USER:
                return `/dashboard/user`;
            default:
                return '/dashboard/user';
        }
    };

    const handleRedirect = (userData: UserAccount) => {
        // Check if there's a saved redirect URL
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin'); // Clear the saved URL
            router.push(redirectUrl);
            return;
        }

        // For regular users - redirect to home
        if (userData.role === Role.USER) {
            router.push('/');
            return;
        }

        // For other roles, redirect to their dashboard
        const dashboardUrl = getDashboardUrl(userData.role);
        router.push(dashboardUrl);
    };

    const login = async (email: string, password: string, rememberMe?: boolean): Promise<UserAccount> => {
        try {
            if (!email || !password) {
                throw new Error('Email dan password harus diisi');
            }

            const emailString = String(email).trim();
            const userCredential = await signInWithEmailAndPassword(auth, emailString, password);
            const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, userCredential.user.uid));
            const userData = userDoc.data() as UserAccount;

            if (!userData) {
                throw new Error('User account not found');
            }

            // Check if user account is inactive
            if (!userData.isActive) {
                setShowInactiveModal(true);
                await signOut(auth);
                return userData;
            }

            // Pastikan setUser dipanggil sebelum handleRedirect
            setUser(userData);

            // Set cookie if rememberMe is true
            if (rememberMe) {
                document.cookie = `auth=${userCredential.user.uid};path=/;max-age=${30 * 24 * 60 * 60};secure;samesite=strict`;
            } else {
                document.cookie = `auth=${userCredential.user.uid};path=/;secure;samesite=strict`;
            }

            const welcomeMessage = getWelcomeMessage(userData);
            toast.success(welcomeMessage);

            // Pindahkan handleRedirect ke bawah
            handleRedirect(userData);

            return userData;
        } catch (error) {
            if (error instanceof Error) {
                // Check if the error is due to disabled account
                if (error.message.includes('auth/user-disabled')) {
                    setShowInactiveModal(true);
                } else {
                    toast.error('Login gagal: ' + error.message);
                }
            } else {
                toast.error('Terjadi kesalahan saat login');
            }
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            await signOut(auth);

            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
            });

            localStorage.clear();
            sessionStorage.clear();

            toast.success('Anda berhasil logout');
            router.push('/auth/login');
        } catch {
            toast.error('Terjadi kesalahan saat logout');
        }
    };

    const deleteAccount = async () => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }

            const idToken = await auth.currentUser?.getIdToken();
            if (!idToken) {
                throw new Error('Failed to get authentication token');
            }

            const response = await fetch('/api/user/delete', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to delete account');
            }

            setUser(null);
            toast.success('Akun berhasil dihapus');
            router.push('/');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Gagal menghapus akun');
            throw error;
        }
    };

    const hasRole = (roles: string | string[]): boolean => {
        if (!user) return false;
        if (Array.isArray(roles)) {
            return roles.includes(user.role);
        }
        return user.role === roles;
    };

    const getWelcomeMessage = (userData: UserAccount): string => {
        const { fullName } = userData;
        return `Selamat datang, ${fullName}!`;
    };

    const signUp = async (
        email: string,
        password: string,
        fullName: string,
        username: string,
        phoneNumber: string,
        referralCode: string
    ): Promise<string> => {
        try {
            if (!process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS) {
                throw new Error('Collection path is not configured');
            }

            // Check if username already exists
            const usernameQuery = await getDocs(
                query(
                    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS),
                    where('username', '==', username.toLowerCase())
                )
            );

            if (!usernameQuery.empty) {
                throw new Error('Username already taken');
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const userData: UserAccount = {
                uid: userCredential.user.uid,
                email: email,
                fullName: fullName,
                username: username.toLowerCase(),
                phoneNumber: phoneNumber,
                role: Role.USER,
                createdAt: new Date(),
                updatedAt: new Date(),
                isActive: true,
                referralCode: referralCode
            };

            const userDocRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS, userCredential.user.uid);
            await setDoc(userDocRef, userData);

            // Sign out immediately after creating account
            await signOut(auth);

            // Return the new user's UID
            return userCredential.user.uid;
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('auth/email-already-in-use')) {
                    toast.error('Email already in use. Please use a different email.');
                } else if (error.message.includes('Username already taken')) {
                    toast.error('Username already taken. Please choose a different username.');
                } else {
                    toast.error('Registration failed: ' + error.message);
                }
            } else {
                toast.error('Registration failed');
            }
            throw error;
        }
    };

    const forgotPassword = async (email: string): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent! Please check your inbox.');
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('auth/user-not-found')) {
                    toast.error('No account found with this email address.');
                } else {
                    toast.error('Failed to send reset email: ' + error.message);
                }
            } else {
                toast.error('Failed to send reset email.');
            }
            throw error;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (firebaseUser && process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS) {
                    const userDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, firebaseUser.uid));
                    const userData = userDoc.data() as UserAccount;

                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        loading,
        login,
        logout,
        deleteAccount,
        hasRole,
        getDashboardUrl,
        signUp,
        forgotPassword,
        showInactiveModal,
        setShowInactiveModal
    };
    return (
        <AuthContext.Provider value={value as AuthContextType}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};