import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthError {
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: AuthError | null }>;
  verifyOtp: (email: string, otp: string) => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const apiBase = 'https://smart-certs-npkd4.ondigitalocean.app/api';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token and validate on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch(`${apiBase}/validate-token`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (res.ok) {
            const data = await res.json();
            setUser(data.user || { id: 'temp-id', email: localStorage.getItem('email') || '' });
          } else {
            // Invalid token, remove it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth validation error:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', email);
        setUser({ id: data.userId || 'temp-id', email });
        return { error: null };
      }
      
      return { error: { message: data.error || 'Login failed' } };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        alert("Congratulations! Please sign in now.")
        return { error: null };
      }
      
      return { error: { message: data.error || 'Registration failed' } };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('email', email);
          setUser({ id: data.userId || 'temp-id', email });
        }
        return { error: null };
      }
      
      return { error: { message: data.error || 'OTP verification failed' } };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    // Don't remove access code or course access on logout
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        return { error: null };
      }
      
      return { error: { message: data.error || 'Password reset failed' } };
    } catch (error) {
      console.error('Password reset error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (newPassword: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return { error: { message: 'Not authenticated' } };
      }
      
      const res = await fetch(`${apiBase}/update-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        return { error: null };
      }
      
      return { error: { message: data.error || 'Password update failed' } };
    } catch (error) {
      console.error('Password update error:', error);
      return { error: { message: 'An unexpected error occurred' } };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signIn,
      signUp,
      signOut,
      resetPassword,
      updatePassword,
      verifyOtp
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}