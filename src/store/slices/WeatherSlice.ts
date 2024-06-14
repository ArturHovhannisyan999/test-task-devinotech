import { createSlice } from "@reduxjs/toolkit";
import { fetchWeathers } from "../api";

const initialState: any = {
    weathers: {
        list: []
    },
    isLoading: false,
    error: ''
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeathers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWeathers.fulfilled, (state, action) => {
                state.weathers = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchWeathers.rejected, (state) => {
                state.isLoading = false;
                state.error = 'Ooops...'
            });
    }
})

export default weatherSlice.reducer;