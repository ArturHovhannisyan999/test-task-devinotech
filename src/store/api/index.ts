import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from "../constants";

interface MyArgs {
    city: string;
    type: number;
}

export const fetchWeathers = createAsyncThunk<any, any, { rejectValue: string }>(
    'weather/fetchWeathers',
    async function (args: MyArgs, {rejectWithValue}) {
        const response = await fetch(`${API_URL}${args.type}?q=${args.city}&appid=${API_KEY}`);
        if (!response.status) {
            return rejectWithValue("Something went wrong!")
        }
        const data = response.json();
        return data;
    } 
)