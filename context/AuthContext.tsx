'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// TODO: Replace DemoAuth with Supabase Auth before production.

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: string;
  companyName?: string;
  jobTitle?: string;
  phone?: string;
  bio?: string;
  linkedInUrl?: string;
  location?: string;
}

export const DEMO_USER: DemoUser = {
  id: 'demo-user',
  name: 'Founder Workspace',
  email: 'demo@talentos.ai',
  role: 'Founder',
  companyName: 'HyperScale AI',
  jobTitle: 'Founder & CEO',
  phone: '+1 (555) 234-5678',
  bio: 'Building early-stage founding teams 10x faster using explainable AI.',
  linkedInUrl: 'https://linkedin.com/in/founder-demo',
  location: 'San Francisco, CA',
};

interface AuthContextType {
  user: DemoUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updated: Partial<DemoUser>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  updateProfile: () => {},
});

const DEMO_SESSION_KEY = 'talentos_demo_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedSession = localStorage.getItem(DEMO_SESSION_KEY);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        setUser(parsed);
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email?: string) => {
    setIsLoading(true);
    const sessionUser: DemoUser = {
      ...DEMO_USER,
      email: email || DEMO_USER.email,
    };

    try {
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(sessionUser));
    } catch {
      // Ignore write errors
    }

    setUser(sessionUser);
    setIsLoading(false);
  };

  const updateProfile = (updated: Partial<DemoUser>) => {
    if (!user) return;
    const newProfile: DemoUser = {
      ...user,
      ...updated,
    };

    try {
      localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(newProfile));
    } catch {
      // Ignore write errors
    }

    setUser(newProfile);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem(DEMO_SESSION_KEY);
    } catch {
      // Ignore removal errors
    }
    setUser(null);
    setIsLoading(false);
    router.push('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
