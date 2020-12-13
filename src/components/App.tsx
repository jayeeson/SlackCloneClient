import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainApp from './MainApp';
import Auth from './Auth';
import { theme } from './themes/root';
import { CssBaseline, ThemeProvider } from '@material-ui/core';

const App = () => {
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
