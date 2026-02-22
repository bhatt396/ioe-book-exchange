import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
    id: string;
    name: string;
    email: string;
    campus: string;
    department: string;
    semester: number;
    wishlist: string[];
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: {
        name: string;
        email: string;
        password: string;
        campus: string;
        department: string;
        semester: number;
    }) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            if (authAPI.isAuthenticated()) {
                try {
                    const data = await authAPI.getMe();
                    setUser(data.user);
                } catch {
                    authAPI.logout();
                    setUser(null);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await authAPI.login({ email, password });
        setUser(data.user);
    };

    const register = async (userData: {
        name: string;
        email: string;
        password: string;
        campus: string;
        department: string;
        semester: number;
    }) => {
        const data = await authAPI.register(userData);
        setUser(data.user);
    };

    const logout = () => {
        authAPI.logout();
        setUser(null);
    };

    const refreshUser = async () => {
        try {
            const data = await authAPI.getMe();
            setUser(data.user);
        } catch {
            logout();
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, register, logout, refreshUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
