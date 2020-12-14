import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { theme } from './themes/root';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { fetchLoginStatus } from '../store/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainApp />
    </ThemeProvider>
  );
};

export default App;
