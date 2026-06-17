'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { postApi } from '../lib/api';
import type { AuthUser, AuthResponse } from '@org/shared-types';

const AUTH_STORAGE_KEY = 'epicure_auth';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') return { user: null, token: null };
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return { user: null, token: null };
    try {
      return JSON.parse(stored) as AuthState;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, token: null };
    }
  });

  function persist(next: AuthState) {
    setState(next);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next));
  }

  async function login(email: string, password: string): Promise<void> {
    const response = await postApi<AuthResponse>('/api/auth/login', { email, password });
    persist({ user: response.user, token: response.jwt });
  }

  async function register(name: string, email: string, password: string): Promise<void> {
    const response = await postApi<AuthResponse>('/api/auth/register', { name, email, password });
    persist({ user: response.user, token: response.jwt });
  }

  function logout(): void {
    setState({ user: null, token: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
