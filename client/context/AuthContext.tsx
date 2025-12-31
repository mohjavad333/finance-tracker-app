import React, { createContext, useEffect, useState } from "react";
import { User, AuthState } from "../types/auth";
import { authService } from "../services/authService";

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();

      if (!token) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      try {
        const user = await authService.getMe();

        authService.setUser(user);

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        authService.logout();
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const res = await authService.login({ email, password });

    authService.setToken(res.token);
    authService.setUser(res.user);

    setAuthState({
      user: res.user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const signup = async (email: string, password: string, name: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const res = await authService.signup({ email, password, name });

    authService.setToken(res.token);
    authService.setUser(res.user);

    setAuthState({
      user: res.user,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = async () => {
    authService.logout();
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
