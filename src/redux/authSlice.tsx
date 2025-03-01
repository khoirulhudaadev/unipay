import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInterface } from "../utils/interfaces/authInterface";

interface authStates {
    auth: authInterface,
    token: string | null
}

const initialState: authStates = {
    auth: {},
    token: null
}

const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSignIn: (state, action: PayloadAction<authInterface>) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }
        },
        authSignOut: (state) => {
            state.auth = {},
                state.token = null
        },
        saveToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { authSignIn, authSignOut, saveToken } = authSlice.actions
export default authSlice.reducer