import { combineReducers } from '@reduxjs/toolkit';
import { panelsSlice } from './panels';
import { channelSlice } from './channel';

export const reducers = combineReducers({
  panels: panelsSlice.reducer,
  channel: channelSlice.reducer,
});

export type RootState = ReturnType<typeof reducers>;
