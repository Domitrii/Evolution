import { useState } from "react";
import { initAuthFromStorage, removeToken } from "../../api/client";
import type { User, RegisterResponse } from "../../types/api";
import { AuthContext } from "./useAuth";

interface AuthState {
  user: User | null;
  token: string | null;
}

const getInitialAuthState = (): AuthState => {
  const stored = initAuthFromStorage();
  if (stored?.user && stored?.token) {
    return { user: stored.user, token: stored.token };
  }
  return { user: null, token: null };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ user, token }, setAuthState] = useState<AuthState>(getInitialAuthState);

  const setAuth = (data: RegisterResponse | null) => {
    if (data) {
      setAuthState({ user: data.user, token: data.token });
    } else {
      setAuthState({ user: null, token: null });
    }
  };

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};