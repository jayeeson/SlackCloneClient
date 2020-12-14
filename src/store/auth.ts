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

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    const loggedInUser = await ServerApi.login(username, password);
    if (loggedInUser === username) {
      return { loginStatus: LoginStatus.LoggedIn };
    }
  }
);

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
  },
});
