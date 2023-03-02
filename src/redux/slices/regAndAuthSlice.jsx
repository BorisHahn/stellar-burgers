import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../../utils/const';

export const signUp = createAsyncThunk(
  'accessProcedure/signUp',
  async (data) => {
    const result = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (result.status === 'ok') {
      const data = await result.json();
      return data;
    }
  },
);

const initialState = {
  userInfo: null,
  isLogin: false,
  error: null,
  loadingStatus: null,
};

const regAndAuthSlice = createSlice({
  name: 'accessProcedure',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loadingStatus = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});

export default regAndAuthSlice.reducer;
