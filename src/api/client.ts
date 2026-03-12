import { api } from "../config/api";
import type { LogInRequest, RegisterRequest, RegisterResponse } from "../types/api";

const AUTH_STORAGE_KEY = "auth";

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  api.defaults.headers.common.Authorization = ``;
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
};

const saveAuthToStorage = (data: RegisterResponse) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save auth to storage", error);
  }
};

const getAuthFromStorage = (): RegisterResponse | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    // console.log(raw);
    if (!raw) return null;
    return JSON.parse(raw) as RegisterResponse;
  } catch (error) {
    console.error("Failed to read auth from storage", error);
    return null;
  }
};

export const initAuthFromStorage = () => {
  const stored = getAuthFromStorage();
  if (stored?.token) {
    setToken(stored.token);
  }
  return stored ?? null;
};

export const requestSignUp = async (
  formData: RegisterRequest
): Promise<RegisterResponse | undefined> => {
  try {
    const { data } = await api.post<RegisterResponse>("/users/register", formData);
    setToken(data.token);
    saveAuthToStorage(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const requestLogin = async (
  formData: LogInRequest
): Promise<RegisterResponse | undefined> => {
  try {
    const { data } = await api.post<RegisterResponse>("/users/login", formData);
    setToken(data.token);
    saveAuthToStorage(data);
    console.log(api.defaults.headers)
    return data;
  } catch (error) {
    console.error(error);
  }
};