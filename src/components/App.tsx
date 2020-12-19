import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { theme } from './themes/root';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useAppDispatch } from '../store';
import { getLoginStatus } from '../store/auth';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
