import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginStatus } from '../types';
import ServerApi from '../apis/server';
import { useHistory } from 'react-router-dom';

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
  async ({
    username,
    password,
    history,
  }: {
    username: string;
    password: string;
    history: ReturnType<typeof useHistory>;
  }) => {
    const loggedInUser = await ServerApi.login(username, password);
    console.log('response', loggedInUser);

    if (loggedInUser === username) {
      console.log('rerouting  to root');

      history.push('/');
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
