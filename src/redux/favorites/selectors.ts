import type { RootState } from "../store";

export const selectFavorites = (state: RootState) => state.favorites.favorites
export const selectFavoritesLoading = (state: RootState) => state.favorites.isLoading
export const selectFavoritesError = (state: RootState) => state.favorites.error