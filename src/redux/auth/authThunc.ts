import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestLogin, requestLogout, setToken } from "../../api/client";
import type { LogInRequest, RegisterResponse } from "../../types/api";





export const apiLogin = createAsyncThunk<RegisterResponse, LogInRequest>(
    "auth/login",
    async (formData: LogInRequest, thunkApi) => {
        try {
            const data = await requestLogin(formData)
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const apiLogout = createAsyncThunk(
    "auth/logout",
    async (_, thunkApi) => {
        try{
            const data = await requestLogout()
            return data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const apiRestoreAuth = createAsyncThunk(
    "auth/restore",
    async (_, thunkApi) => {
        try {
            const stored = localStorage.getItem("auth")
            if (!stored) return thunkApi.rejectWithValue("No auth stored")
            const { token, user } = JSON.parse(stored)
            setToken(token)
            return { token, user }
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)