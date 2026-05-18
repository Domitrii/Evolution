import type { RootState } from "../store";


export const selectToken = (state: RootState) => state.auth.token
export const selectIsLoading = (state: RootState) => state.auth.isLoading
export const selectError = (state: RootState) => state.auth.error
export const selectUser = (state: RootState) => ({
    id: state.auth.id,
    name: state.auth.name,
    email: state.auth.email
})
export const selectRestore = (state: RootState) => state.auth.isRestored