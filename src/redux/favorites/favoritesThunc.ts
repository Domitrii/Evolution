import { createAsyncThunk } from "@reduxjs/toolkit"
import { getFavorites, removeFavorite } from "../../api/games"
import type { Favorite } from "../../types/api"

export const apiGetFavorites = createAsyncThunk<Favorite[]>(
    "favorites/getAll",
    async (_, thunkApi) => {
        try {
            const data = await getFavorites()
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const apiRemoveFavorites = createAsyncThunk<string, string>(
    "favorites/remove",
    async (gameId, thunkApi) => {
        try {
            await removeFavorite(gameId)
            return gameId
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)