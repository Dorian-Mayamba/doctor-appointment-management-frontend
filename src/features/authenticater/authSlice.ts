import { createSlice,PayloadAction } from "@reduxjs/toolkit";


interface AuthState {
    token: string;
    name: string;
    email:string;
    userId: number;
    isAuthenticated:Boolean;
    roleType:string;
}

const initialState: AuthState = {
    token: '',
    name: '',
    email:'',
    userId: 0,
    isAuthenticated:false,
    roleType:''
}

export const authSlice = createSlice({
    name: 'authenticater',
    initialState,
    reducers: {
        authenticate:(state,action:PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.roleType = action.payload.roleType;
        },
        unAuthenticate:(state,action:PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.roleType = action.payload.roleType;
        },
    },
})

export const {authenticate, unAuthenticate} = authSlice.actions;

export default authSlice.reducer;