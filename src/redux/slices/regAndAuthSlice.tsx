import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/const';
import checkResponse from '../../utils/helpers/checkResponse';
import {
  IUserInfoState,
  IChangeProfileInfoPayload,
  IChangeProfileInfoResponse,
  ISignInAndUpResponse,
  TForgotAndResetPasswordResponse,
} from '../../types/regAndAuthTypes';
import { IValues } from '../../utils/hooks/ValidationHook';

export const signUp = createAsyncThunk<ISignInAndUpResponse, IValues>(
  'accessProcedure/signUp',
  (data) => {
    return fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(checkResponse);
  },
);

export const signIn = createAsyncThunk<ISignInAndUpResponse, IValues>(
  'accessProcedure/signIn',
  (data) => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(checkResponse);
  },
);

export const resetPassword = createAsyncThunk<
  TForgotAndResetPasswordResponse,
  IValues
>('accessProcedure/resetPassword', (data) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
});

export const forgotPassword = createAsyncThunk<
  TForgotAndResetPasswordResponse,
  IValues
>('accessProcedure/forgotPassword', (data) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
});

export const signOut = createAsyncThunk('accessProcedure/signOut', () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then(checkResponse);
});

export const updateAccessToken = createAsyncThunk(
  'accessProcedure/updateAccessToken',
  () => {
    return fetch(`${BASE_URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    }).then(checkResponse);
  },
);

export const getProfileInfo = createAsyncThunk(
  'accessProcedure/getProfileInfo',
  () => {
    return fetch(`${BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken') || '',
      },
    }).then(checkResponse);
  },
);

export const changeProfileInfo = createAsyncThunk<
  IChangeProfileInfoResponse,
  IChangeProfileInfoPayload
>('accessProcedure/changeProfileInfo', (data) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken') || '',
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
});

const initialState = {
  userInfo: {},
  isLogin: false,
  error: {},
  loadingStatus: false,
};

const regAndAuthSlice = createSlice({
  name: 'accessProcedure',
  initialState: initialState as IUserInfoState,
  reducers: {
    setLoadingStatus: (state) => {
      state.loadingStatus = false;
    },
    setError: (state) => {
      state.error = null;
    },
    setIsLogin: (state) => {
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.success === false) {
        } else {
          state.loadingStatus = false;
          state.error = null;
        }
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })

      .addCase(signIn.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload.success === false) {
        } else {
          state.loadingStatus = false;
          state.userInfo = {
            name: action.payload.user.name,
            email: action.payload.user.email,
          };
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          localStorage.setItem('accessToken', action.payload.accessToken);
          state.isLogin = true;
          state.error = null;
        }
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

      .addCase(changeProfileInfo.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(changeProfileInfo.fulfilled, (state, action) => {
        state.loadingStatus = false;
        if (action.payload.user) {
          state.userInfo = {
            name: action.payload.user.name,
            email: action.payload.user.email,
          };
        }
      })
      .addCase(changeProfileInfo.rejected, (state, action) => {
        state.error = action.error;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.error = action.payload;
        } else {
          state.loadingStatus = false;
          state.error = null;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.error = action.payload;
        } else {
          state.loadingStatus = false;
          state.error = null;
        }
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      })

      .addCase(updateAccessToken.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(updateAccessToken.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.error = action.payload.message;
        } else {
          localStorage.setItem('accessToken', action.payload.accessToken);
          localStorage.setItem('refreshToken', action.payload.refreshToken);
          state.loadingStatus = false;
          state.error = null;
        }
      })
      .addCase(updateAccessToken.rejected, (state, action) => {
        state.loadingStatus = false;
        state.error = action.error;
      });
  },
});
export const { setLoadingStatus, setError, setIsLogin } =
  regAndAuthSlice.actions;
export default regAndAuthSlice.reducer;
