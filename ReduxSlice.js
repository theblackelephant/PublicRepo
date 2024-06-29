import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStatus = createAsyncThunk('status/fetchStatus', async () => {
  const response = await axios.get('http://localhost:5000/status');
  return response.data.status;
});

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    value: 'unknown',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStatus.fulfilled, (state, action) => {
        state.value = action.payload;
        state.loading = false;
      })
      .addCase(fetchStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statusSlice.reducer;
