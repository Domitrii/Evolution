import { createSlice } from "@reduxjs/toolkit";
import { apiLogin, apiLogout, 
    apiRestoreAuth 
} from "./authThunc";

interface LoadingState {
    isLoading: boolean
    error: string | null
}

export interface AuthState {
    id: string
    name: string
    email: string
    token: string
    refreshToken: string
    isLoading: boolean
    isRestored: boolean
    error: string | null
}

const initialState: AuthState = {
    id: "",
    name: "",
    email: "",
    token: "",
    refreshToken: "",
    isRestored: false,
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

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(apiLogin.pending, handlePending)
        .addCase(apiLogin.fulfilled, (state, action) => {
            state.id = action.payload.user.id
            state.email = action.payload.user.email
            state.name = action.payload.user.name
            state.token = action.payload.token
            state.isLoading = false
            state.error = null
        })
        .addCase(apiLogin.rejected, handleError)
        .addCase(apiLogout.pending, handlePending)
        .addCase(apiLogout.fulfilled, (state) => {
            state.email = ""
            state.id = ""
            state.name = ""
            state.token = ""
        })
        .addCase(apiLogout.rejected, handleError)
        // .addCase(apiRestoreAuth.pending, handlePending)
        // .addCase(apiRestoreAuth.fulfilled, (state, action) => {
        //     state.token = action.payload.token
        //     state.id = action.payload.user.id
        //     state.name = action.payload.user.name
        //     state.email = action.payload.user.email
        //     state.isRestored = true
        // })
        // .addCase(apiRestoreAuth.rejected, (state) => {
        //     state.isRestored = true
        // })
    },
})

export const authReducer = authSlice.reducer
