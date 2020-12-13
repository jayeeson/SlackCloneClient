import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainApp from './MainApp';
import Auth from './Auth';
import { theme } from './themes/root';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchLoginStatus } from '../store/auth';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/" exact component={MainApp}></Route>
          <Route path="/auth" exact component={Auth}></Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
