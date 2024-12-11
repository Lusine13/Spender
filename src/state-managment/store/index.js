import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from '../slices/userProfile';
import walletEventsReducer from '../slices/walletEvents'

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        walletEvents: walletEventsReducer,
    } 
});