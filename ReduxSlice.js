import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatus = createAsyncThunk('status/fetchStatus', async () => {
    const response = await axios.get('http://localhost:5000/api/status');
    return response.data;
});

const statusSlice = createSlice({
    name: 'status',
    initialState: {
        hosts: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatus.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.hosts = action.payload;
            })
            .addCase(fetchStatus.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default statusSlice.reducer;
