import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authInterface } from "../utils/interfaces/authInterface";

interface authStates {
    auth: authInterface,
    token: string
}

const initialState: authStates = {
    auth: {
        email: "",
        number_telephone: "",
        fullName: "",
        gender: "",
        NIK: "",
        NIM: "",
        prodi: "",
        type_photo: ""
    },
    token: ""
}

const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authSignIn: (state, action:PayloadAction<authInterface>) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }   
        },
        authSignOut: (state) => {
            state.auth = initialState.auth,
            state.token = initialState.token
        },
        saveToken: (state, action:PayloadAction<string>) => {
            state.token = action.payload
        }
    }
})

export const { authSignIn, authSignOut, saveToken } = authSlice.actions
export default authSlice.reducer