import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, mainURL} from '../../utils/const';

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
    if (result) {
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

export const resetPassword = createAsyncThunk(
  'accessProcedure/resetPassword',
  async (data) => {
    const result = await fetch(`${mainURL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (result) {
      const data = await result.json();
      return data;
    }
  },
);

export const signOut = createAsyncThunk(
  'accessProcedure/signOut',
  async () => {
    const result = await fetch(`${baseURL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"token": localStorage.getItem('refreshToken')}),
    });
    if (result.ok) {
      const data = await result.json();
      return data;
    }
  },
);

export const getProfileInfo = createAsyncThunk(
  'accessProcedure/getProfileInfo',
  async () => {
    const promise = await fetch(`${baseURL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
    });
    if (promise.ok) {
      const data = await promise.json();
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
        };
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        localStorage.setItem('accessToken', action.payload.accessToken);
        state.isLogin = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })
      .addCase(getProfileInfo.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.loadingStatus = false;
        state.isLogin = true;
        state.userInfo = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })
      .addCase(signOut.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.loadingStatus = false;
        localStorage.clear();
        state.isLogin = false;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })
  },
});

export default regAndAuthSlice.reducer;
