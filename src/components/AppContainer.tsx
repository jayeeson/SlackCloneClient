import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import SlackSocket from '../hooks/useSocket';

const theme = createMuiTheme({
  palette: {
    background: {
      default: 'linear-gradient(180deg, #636363 30%, #333333 90%)',
    },
  },
});

const AppContainer = ({ children }: { children: React.ReactChild }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <SlackSocket />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </React.Fragment>
  );
};

export default AppContainer;
