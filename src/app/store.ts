import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authenticater/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import {thunk} from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
    blacklist:['token']
}

const persistedReducer = persistReducer(persistConfig,authReducer);


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