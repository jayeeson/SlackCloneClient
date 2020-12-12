import { combineReducers } from '@reduxjs/toolkit';
import { panelsSlice } from './panels';
import { channelSlice } from './channel';
import { authSlice } from './auth';

export const reducers = combineReducers({
  panels: panelsSlice.reducer,
  channel: channelSlice.reducer,
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof reducers>;
