import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginStatus } from '../types';
import ServerApi from '../apis/server';

interface AuthState {
  loginStatus: LoginStatus;
}

const initialState: AuthState = {
  loginStatus: LoginStatus.Unknown,
};

export const fetchLoginStatus = createAsyncThunk('auth/fetchLoginStatus', async () => {
  const status = await ServerApi.getLoginStatus();
  return { status };
});

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    await ServerApi.register(username, password);
    thunkAPI.dispatch(login({ username, password }));
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const loggedInUser = await ServerApi.login(username, password);
    if (loggedInUser === username) {
      return { loginStatus: LoginStatus.LoggedIn };
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await ServerApi.logout();
  return { loginStatus: LoginStatus.LoggedOut };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLoginStatus.fulfilled, (state, action) => {
      return { ...state, loginStatus: action.payload.status };
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      if (payload?.loginStatus === LoginStatus.LoggedIn) {
        return { ...state, loginStatus: payload.loginStatus };
      }
      return state;
    });
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      if (payload) {
        return { ...state, loginStatus: payload.loginStatus };
      }
      return state;
    });
  },
});
