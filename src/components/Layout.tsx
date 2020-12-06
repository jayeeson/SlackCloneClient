import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';

const Layout = () => {
  const theme = useTheme();
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));

  if (isDeviceXs) {
    return <PanelsSwipe />;
  }
  return <PanelsFlexbox />;
};

export default Layout;
