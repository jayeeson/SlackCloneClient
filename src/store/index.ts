import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { panelsSlice } from './panels';
import { authSlice } from './auth';
import { useDispatch } from 'react-redux';
import { userSlice } from './user';
import { chatSlice } from './chat';

export const reducers = combineReducers({
  panels: panelsSlice.reducer,
  auth: authSlice.reducer,
  user: userSlice.reducer,
  chat: chatSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
