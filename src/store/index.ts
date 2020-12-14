import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { panelsSlice } from './panels';
import { channelSlice } from './channel';
import { authSlice } from './auth';
import { useDispatch } from 'react-redux';

export const reducers = combineReducers({
  panels: panelsSlice.reducer,
  channel: channelSlice.reducer,
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
