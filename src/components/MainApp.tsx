import { CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import React from 'react';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';

const MainApp = () => {
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));

  const renderLayout = () => {
    if (isDeviceXs) {
      return <PanelsSwipe />;
    }
    return <PanelsFlexbox />;
  };

  return (
    <React.Fragment>
      <SlackSocket />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {renderLayout()}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default MainApp;
