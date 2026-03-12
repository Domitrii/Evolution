import { createContext, useContext } from "react";
import type { User, RegisterResponse } from "../../types/api";

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthContextValue extends AuthState {
  setAuth: (data: RegisterResponse | null) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};