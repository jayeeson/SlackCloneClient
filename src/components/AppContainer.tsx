import React, { useEffect } from 'react';
import App from './App';
import { theme } from './themes/root';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useAppDispatch } from '../store';
import { getLoginStatus } from '../store/auth';

const AppContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

export default AppContainer;
