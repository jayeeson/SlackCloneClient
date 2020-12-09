import { combineReducers } from '@reduxjs/toolkit';
import { panelsSlice } from './panels';

export const reducers = combineReducers({
  panels: panelsSlice.reducer,
});

export type RootState = ReturnType<typeof reducers>;
