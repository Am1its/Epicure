'use client';

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import { postApi, setAuthToken, setOnUnauthorized } from '../lib/api';
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

function isValidAuthState(val: unknown): val is AuthState {
  if (!val || typeof val !== 'object') return false;
  const v = val as Record<string, unknown>;
  if (v['user'] === null) return v['token'] === null;
  const u = v['user'];
  if (!u || typeof u !== 'object') return false;
  const user = u as Record<string, unknown>;
  return typeof user['id'] === 'number' && typeof user['name'] === 'string' && typeof user['email'] === 'string'
    && typeof v['token'] === 'string';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    if (typeof window === 'undefined') return { user: null, token: null };
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return { user: null, token: null };
    try {
      const parsed: unknown = JSON.parse(stored);
      if (isValidAuthState(parsed)) {
        setAuthToken(parsed.token);
        return parsed;
      }
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, token: null };
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return { user: null, token: null };
    }
  });

  function persist(next: AuthState) {
    setAuthToken(next.token);
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
    setAuthToken(null);
    setState({ user: null, token: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  const logoutRef = useRef(logout);
  useEffect(() => { logoutRef.current = logout; });

  useEffect(() => {
    setOnUnauthorized(() => logoutRef.current());
    return () => setOnUnauthorized(null);
  }, []);

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
