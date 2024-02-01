import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    token: string;
    name: string;
    userId: number;
    isAuthenticated:Boolean;
}

const initialState: AuthState = {
    token: '',
    name: '',
    userId: 0,
    isAuthenticated:false
}

export const authSlice = createSlice({
    name: 'authenticater',
    initialState,
    reducers: {
        authenticate:(state,action:PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
        unAuthenticate:(state,action:PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.isAuthenticated = action.payload.isAuthenticated;
        },
    },
})

export const {authenticate, unAuthenticate} = authSlice.actions;

export default authSlice.reducer;