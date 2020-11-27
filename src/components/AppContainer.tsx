import { CssBaseline } from '@material-ui/core';
import React from 'react';
import SlackSocket from './Socket';

const AppContainer = ({ children }: { children: React.ReactChild }) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <SlackSocket />
      {children}
    </React.Fragment>
  );
};

export default AppContainer;
