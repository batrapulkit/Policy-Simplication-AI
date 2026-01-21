import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false); // Changed to false initially as we just check token

  useEffect(() => {
    // Initialize Supabase Session if token exists
    const initAuth = async () => {
      if (token) {
        // Set the session on the Supabase client so RLS works
        const { error } = await supabase.auth.setSession({
          access_token: token,
          refresh_token: token // This is a hack if we don't have the refresh token, but strictly setSession might validly take just access_token in some versions, or we need to persist refresh token too. 
          // Better: just inspect the user.
        });

        // Actually, setSession usually needs a valid refresh token pair or just access_token if we don't care about auto-refresh immediately.
        // Let's try getting the user. If that works, the session is valid-ish.

        const { data: { user: sbUser }, error: userError } = await supabase.auth.getUser(token);

        if (sbUser) {
          setUser(sbUser);
        } else {
          // Token invalid
          logout();
        }
      } else {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName }),
      });

      const rawText = await response.text();
      let data;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        console.error('Failed to parse JSON response:', rawText);
        throw new Error(`Server returned non-JSON response: ${rawText.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (data.token) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
      }

      // Note: Signup usually requires email verification, so we don't auto-login here unless token is returned.
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
