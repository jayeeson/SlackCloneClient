import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginStatus } from '../types';
import ServerApi from '../apis/server';

interface AuthState {
  loginStatus: LoginStatus;
}

const initialState: AuthState = {
  loginStatus: LoginStatus.Unknown,
};

export const fetchLoginStatus = createAsyncThunk('auth/fetchLoginStatusThunk', async () => {
  const status = await ServerApi.getLoginStatus();
  return { status };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLoginStatus.fulfilled, (state, action) => {
      return { ...state, loginStatus: action.payload.status };
    });
  },
});
