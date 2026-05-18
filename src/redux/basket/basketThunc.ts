import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGames } from "../../api/games";
import type { Game } from "../../types/api";



export const apiGetGames = createAsyncThunk<Game[]>(
    "games/games",
    async (_, thunkApi) => {
        try {
            const data = await getGames()
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)
