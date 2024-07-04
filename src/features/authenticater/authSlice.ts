import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { AppointmentResponseModel, RatingData,ReviewData } from "../../../src/types/types";

interface AuthState {
    token: string;
    name: string;
    email:string;
    userId: number;
    userProfile:string;
    isAuthenticated:Boolean;
    roleType:string;
    appointments?:AppointmentResponseModel[];
    reviews?:ReviewData[];
    ratings?:RatingData[];
}

export const initialState: AuthState = {
    token: '',
    name: '',
    email:'',
    userId: 0,
    userProfile:'',
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
            state.userProfile = action.payload.userProfile;
            state.appointments = action.payload.appointments;
            state.reviews = action.payload.reviews;
            state.ratings = action.payload.ratings;
        },
        unAuthenticate:(state,action:PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = action.payload.isAuthenticated;
            state.roleType = action.payload.roleType;
            state.userProfile = action.payload.userProfile;
            state.appointments = action.payload.appointments;
            state.reviews = action.payload.reviews;
            state.ratings = action.payload.ratings;
        },
    },
})

export const {authenticate, unAuthenticate} = authSlice.actions;

export default authSlice.reducer;