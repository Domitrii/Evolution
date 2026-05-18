import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BasketItem, Game } from "../../types/api";
import { apiGetGames } from "./basketThunc";

interface GamesState {
  games: Game[]
  items: BasketItem[]
  isLoading: boolean
  error: string | null
}

interface LoadingState {
    isLoading: boolean
    error: string | null
}

const initialGameState: GamesState = {
  games: [],
  items: [],
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


const gamesSlice = createSlice({
  name: "gameArray",
  initialState: initialGameState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const exists = state.items.some(item => item.id === action.payload)
      if (!exists) {
        state.items.push({ id: action.payload })
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
      builder
        .addCase(apiGetGames.pending, handlePending)
        .addCase(apiGetGames.fulfilled, (state, action) => {
            state.isLoading = false
            state.games = action.payload
        })
        .addCase(apiGetGames.rejected, handleError)
  },
})

export const {addItem, removeItem} = gamesSlice.actions

export const basketReducer = gamesSlice.reducer