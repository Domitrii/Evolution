import { configureStore } from "@reduxjs/toolkit";
import { authReducer, type AuthState } from './auth/authSlice'
import { basketReducer } from "./basket/basketSlice";
import { favoriteReducer } from "./favorites/favoritesSlice";
import { initAuthFromStorage } from "../api/client";

const stored = initAuthFromStorage()

const preloadedAuth: AuthState = stored ? {
    id: stored.user.id,
    name: stored.user.name,
    email: stored.user.email,
    token: stored.token,
    refreshToken: stored.refreshToken ?? "",
    isLoading: false,
    isRestored: true,
    error: null
} : {
    id: "",
    name: "",
    email: "",
    token: "",
    refreshToken: "",
    isLoading: false,
    isRestored: true,  // true even when no stored auth — nothing to restore
    error: null
}


export const store = configureStore({
    reducer:{
        auth: authReducer,
        basket: basketReducer,
        favorites: favoriteReducer
    },
    preloadedState: {
        auth: preloadedAuth
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

