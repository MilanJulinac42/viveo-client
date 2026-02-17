"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  type AuthUser,
  type LoginPayload,
  type RegisterPayload,
} from "@/lib/api";

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USER_STORAGE_KEY = "viveo_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      const token = localStorage.getItem("viveo_access_token");
      if (stored && token) {
        setState({ user: JSON.parse(stored), loading: false });
      } else {
        setState({ user: null, loading: false });
      }
    } catch {
      setState({ user: null, loading: false });
    }
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const { user } = await apiLogin(payload);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setState({ user, loading: false });
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { user } = await apiRegister(payload);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    setState({ user, loading: false });
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    localStorage.removeItem(USER_STORAGE_KEY);
    setState({ user: null, loading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
