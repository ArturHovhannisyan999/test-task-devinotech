import { configureStore, combineReducers } from "@reduxjs/toolkit";
import WeatherSlice from "./slices/WeatherSlice";

const rootReducer = combineReducers({
    weather: WeatherSlice
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;