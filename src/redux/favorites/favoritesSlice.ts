import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Favorite } from "../../types/api";
import { apiGetFavorites, apiRemoveFavorites } from "./favoritesThunc";

interface LoadingState {
    isLoading: boolean
    error: string | null
}

interface FavoriteState {
    favorites: Favorite[]
    isLoading: boolean
    error: string | null
}


const initialFavoriteState: FavoriteState = {
    favorites: [],
    isLoading: false,
    error: null
}

const handlePending = (state: LoadingState) => {
    state.isLoading = true
}

const handleError = (state: LoadingState, action: { error: { message?: string } }) => {
    state.isLoading = false
    state.error = action.error?.message || 'An error occurred'
}

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: initialFavoriteState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(apiGetFavorites.pending, handlePending)
            .addCase(apiGetFavorites.fulfilled, (state, action: PayloadAction<Favorite[]>) => {
                state.isLoading = false
                state.favorites = action.payload
            })
            .addCase(apiGetFavorites.rejected, handleError)
            .addCase(apiRemoveFavorites.pending, handlePending)
            .addCase(apiRemoveFavorites.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.favorites = state.favorites.filter(f => f._id !== action.payload)
            })
            .addCase(apiRemoveFavorites.rejected, handleError)
    },
})

export const favoriteReducer = favoriteSlice.reducer
