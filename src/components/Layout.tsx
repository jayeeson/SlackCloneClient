import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import useMsgPanelWidth from '../hooks/useMsgPanelWidth';
import useWindowSize from '../hooks/useWindowSize';
import Divider from './Divider';
import MsgPanel from './MsgPanel';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';

const validateWidth = (width: number | string | null, minWidth?: number, maxWidth?: number) => {
  if (!width) {
    return null;
  }
  const num = typeof width === 'string' ? parseInt(width, 10) : width;
  if (minWidth && num < minWidth) {
    return minWidth;
  }
  if (num < 0) {
    return minWidth || 150;
  }
  if (maxWidth && num > maxWidth) {
    return maxWidth;
  }
  return num;
};

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(180deg, #636363 30%, #333333 90%)',
  },
  flexItem: {
    margin: '0 0',
    padding: 0,
  },
}));

interface Breakpoints {
  [key: string]: {
    minMsgPanelWidth: number;
    reopenMsgPanelWidth: number;
    reopenStatusBarWidth: number;
  };
}

const allBreakpoints: Breakpoints = {
  sm: {
    minMsgPanelWidth: 250,
    reopenMsgPanelWidth: 500,
    reopenStatusBarWidth: 700,
  },
  md: {
    minMsgPanelWidth: 275,
    reopenMsgPanelWidth: 600,
    reopenStatusBarWidth: 800,
  },
  lg: {
    minMsgPanelWidth: 300,
    reopenMsgPanelWidth: 700,
    reopenStatusBarWidth: 900,
  },
  xl: {
    minMsgPanelWidth: 300,
    reopenMsgPanelWidth: 800,
    reopenStatusBarWidth: 1000,
  },
};

const Layout = () => {
  const [sidebarWidth, setSidebarWidth] = useState(validateWidth(localStorage.getItem('sidebarWidth')) || 250);
  const [viewPanelWidth, setviewPanelWidth] = useState(validateWidth(localStorage.getItem('viewPanelWidth')) || 250);
  const windowSize = useWindowSize();
  const theme = useTheme();
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));

  const classes = useStyles({ sidebar: { width: sidebarWidth }, viewPanel: { width: viewPanelWidth } });

  if (isDeviceXs) {
    return <PanelsSwipe />;
  }
  return <PanelsFlexbox />;
};

export default Layout;
