import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authenticater/authSlice";
import profileReducer from "../features/profiles/profileSlice";
import patientReducter from '../features/patient/patientSlice';
import patientsReducer from '../features/patient/patientSlice';
import doctorReducer from '../features/doctor/doctorSlice';
import doctorReducers from '../features/doctor/doctorSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    authReducer:authReducer,
    profileReducer:profileReducer,
    patientReducer:patientReducter.patientReducer,
    patientsReducer:patientsReducer.patientsReducer,
    doctorReducer:doctorReducer.doctorReducer,
    doctorsReducers:doctorReducers.doctorsReducer,
})

const persistedReducer = persistReducer(persistConfig,reducers);


export const store =  configureStore({
    reducer:persistedReducer,
    devTools:process.env.NODE_ENV !== 'production',
    middleware(getDefaultMiddleware) {
        return [thunk];
    }, 
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);