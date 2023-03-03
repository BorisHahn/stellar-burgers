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
    if (result.ok) {
      const data = await result.json();
      return data;
    }
  },
);

export const signIn = createAsyncThunk(
  'accessProcedure/signIn',
  async (data) => {
    const result = await fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (result.ok) {
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
      })
      .addCase(signIn.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.userInfo = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          accessToken: action.payload.accessToken,
        };
        state.isLogin = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        console.log(action);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});

export default regAndAuthSlice.reducer;
