import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ProfileState{
    username: string;
    email: string;
    number: string;
    profile?: any;
    profilePath?: string | null;
}

const initialState: ProfileState = {
    username: '',
    email: '',
    number: '',
    profile: null,
    profilePath: null,
}

export const profileSlice = createSlice({
    name:'profileBuilder',
    initialState,
    reducers:{
        setProfile:(state, action:PayloadAction<ProfileState>)=> {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.number = action.payload.number;
            state.profile = action.payload.profile;
            state.profilePath = action.payload.profilePath;
        },

        unSetProfile:(state, action:PayloadAction<ProfileState>)=>{
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.number = action.payload.number;
            state.profile = action.payload.profile;
            state.profilePath = action.payload.profilePath;
        }
    },
});

export const {setProfile, unSetProfile} = profileSlice.actions;

export default profileSlice.reducer;