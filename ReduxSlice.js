// src/features/status/statusSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatus = createAsyncThunk('status/fetchStatus', async (host) => {
    const response = await axios.get(`/api/status/${host}`);
    return response.data;
});

const statusSlice = createSlice({
    name: 'status',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStatus.fulfilled, (state, action) => {
            state[action.meta.arg] = action.payload.status;
        });
    },
});

export default statusSlice.reducer;
