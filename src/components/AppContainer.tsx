import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import SlackSocket from '../hooks/useSocket';
import { theme } from './themes/root';

const AppContainer = ({ children }: { children: React.ReactChild }) => {
  return (
    <React.Fragment>
      <SlackSocket />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default AppContainer;
