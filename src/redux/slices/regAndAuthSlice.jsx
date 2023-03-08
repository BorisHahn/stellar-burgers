import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL, mainURL } from '../../utils/const';

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
    if (result) {
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

export const signOut = createAsyncThunk('accessProcedure/signOut', async () => {
  const result = await fetch(`${baseURL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
  if (result) {
    const data = await result.json();
    return data;
  }
});

export const updateAccessToken = createAsyncThunk(
  'accessProcedure/updateAccessToken',
  async () => {
    const result = await fetch(`${baseURL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
    });
    if (result) {
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
      if (promise) {
        const data = await promise.json();
        return data;
      }
  },
);

export const changeProfileInfo = createAsyncThunk(
  'accessProcedure/changeProfileInfo',
  async (data) => {
    const promise = await fetch(`${baseURL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    });
    if (promise) {
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
  reducers: {
    setLoadingStatus: (state, action) => {
      state.loadingStatus = false;
    },
    setError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loadingStatus = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.error = action.payload.message;
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
          state.error = action.payload.message;
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
        state.userInfo = {
          name: action.payload.user.name,
          email: action.payload.user.email,
        };
      })
      .addCase(changeProfileInfo.rejected, (state, action) => {
        state.error = action.error;
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.loadingStatus = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        if (action.payload.success === false) {
          state.error = action.payload.message;
        } else {
          state.loadingStatus = false;
          state.error = null;
        }
      })
      .addCase(resetPassword.rejected, (state, action) => {
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
export const { setLoadingStatus, setError } = regAndAuthSlice.actions;
export default regAndAuthSlice.reducer;
