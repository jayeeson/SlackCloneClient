import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import SlackSocket from '../hooks/useSocket';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#313134',
    },
    divider: '#838383',
    text: {
      primary: 'white',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
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
