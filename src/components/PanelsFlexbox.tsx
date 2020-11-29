import { Box, debounce, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useMsgPanelWidth from '../hooks/useMsgPanelWidth';
import useWindowSize from '../hooks/useWindowSize';
import validateWidth from '../utils/validateWidth';
import Divider from './Divider';
import MsgPanel from './MsgPanel';

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

const PanelsFlexbox = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [debouncedSidebarOpen, setDebouncedSidebarOpen] = useState(sidebarOpen);
  const [viewPanelOpen, setViewPanelOpen] = useState(true);
  const [msgPanelOpen, setMsgPanelOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(validateWidth(localStorage.getItem('sidebarWidth')) || 250);
  const [viewPanelWidth, setviewPanelWidth] = useState(validateWidth(localStorage.getItem('viewPanelWidth')) || 250);
  const [sidebarStickyWidth, setSidebarStickyWidth] = useState(sidebarWidth > 0 ? sidebarWidth : 250);
  const [viewPanelStickyWidth, setViewPanelStickyWidth] = useState(viewPanelWidth > 0 ? viewPanelWidth : 250);
  const [msgPanelWidth, setMsgPanelWidth] = useState(0);
  const [windowSize, setWindowSize] = useState({ x: 0, y: 0 });
  const theme = useTheme();
  const smBreakpoint = useMediaQuery(theme.breakpoints.down('sm'));
  const mdBreakpoint = useMediaQuery(theme.breakpoints.only('md'));
  const lgBreakpoint = useMediaQuery(theme.breakpoints.only('lg'));

  const effectiveBreakpoint = smBreakpoint
    ? allBreakpoints.sm
    : mdBreakpoint
    ? allBreakpoints.md
    : lgBreakpoint
    ? allBreakpoints.lg
    : allBreakpoints.xl;

  useEffect(() => {
    if (viewPanelWidth) {
      setViewPanelStickyWidth(viewPanelWidth);
    }
  }, [viewPanelWidth]);

  useEffect(() => {
    if (sidebarWidth) {
      setSidebarStickyWidth(sidebarWidth);
    }
  }, [sidebarWidth]);

  useLayoutEffect(() => {
    const viewPanelWidth = document.getElementById('viewPanel')?.getBoundingClientRect().width;

    if (viewPanelWidth) {
      setviewPanelWidth(viewPanelWidth);
    }
    const msgPanelWidth = document.getElementById('msgPanel')?.getBoundingClientRect().width;

    if (msgPanelWidth) {
      console.log('setting msgppanel width, sidebar just closed', msgPanelWidth);

      setMsgPanelWidth(msgPanelWidth);
    }
    setDebouncedSidebarOpen(sidebarOpen);
  }, [sidebarOpen]);

  useLayoutEffect(() => {
    console.log('msgpanelWidth', msgPanelWidth);
    if (msgPanelWidth) {
      if (msgPanelWidth < effectiveBreakpoint.minMsgPanelWidth) {
        if (debouncedSidebarOpen) {
          setSidebarOpen(false);
        } else {
          setMsgPanelOpen(false);
        }
      } else if (
        !msgPanelOpen &&
        windowSize.x > effectiveBreakpoint.reopenMsgPanelWidth &&
        windowSize.x - viewPanelWidth > effectiveBreakpoint.reopenMsgPanelWidth
      ) {
        setMsgPanelOpen(true);
      } else if (
        !debouncedSidebarOpen &&
        sidebarStickyWidth + msgPanelWidth + viewPanelWidth > effectiveBreakpoint.reopenStatusBarWidth
      ) {
        setSidebarOpen(true);
      }
    } else {
      if (windowSize.x > 700) {
        setMsgPanelOpen(true);
      }
    }
  }, [
    windowSize,
    msgPanelOpen,
    msgPanelWidth,
    sidebarWidth,
    viewPanelWidth,
    effectiveBreakpoint.minMsgPanelWidth,
    effectiveBreakpoint.reopenMsgPanelWidth,
    effectiveBreakpoint.reopenStatusBarWidth,
    debouncedSidebarOpen,
    sidebarStickyWidth,
  ]);

  useLayoutEffect(() => {
    const setWidthCallback = () => {
      const domWidth = document.getElementById('msgPanel')?.getBoundingClientRect().width;
      if (domWidth) {
        if (domWidth < effectiveBreakpoint.minMsgPanelWidth) {
          setMsgPanelWidth(domWidth);
        }
      }
    };
    window.addEventListener('resize', setWidthCallback);
    setWidthCallback();
    return () => window.removeEventListener('resize', setWidthCallback);
  });

  useLayoutEffect(() => {
    const setSizeCallback = () => {
      const newWindowSize = { x: window.innerWidth, y: window.innerHeight };
      if (windowSize.x !== newWindowSize.x || windowSize.y !== newWindowSize.y) {
        console.log('updating window size', newWindowSize);

        setWindowSize(newWindowSize);
      }
    };
    window.addEventListener('resize', setSizeCallback);
    setSizeCallback();
    return () => window.removeEventListener('resize', setSizeCallback);
  });

  const classes = useStyles({ sidebar: { width: sidebarWidth }, viewPanel: { width: viewPanelWidth } });

  return (
    <Box width="100%" display="flex" height="100vh" className={classes.root}>
      <Box
        height="100%"
        flexGrow={0}
        flexShrink={0}
        flexBasis={sidebarWidth}
        width={sidebarWidth}
        id="sidebar"
        className={classes.flexItem}
        display={sidebarOpen ? 'inline' : 'none'}
      >
        one
      </Box>

      <Divider
        width={sidebarWidth}
        setWidth={setSidebarWidth}
        storeLocal="sidebarWidth"
        minWidth={75}
        maxWidth={500}
        display={sidebarOpen ? 'inline' : 'none'}
      />
      <MsgPanel display={msgPanelOpen ? 'initial' : 'none'} />
      <Divider
        width={viewPanelWidth}
        setWidth={setviewPanelWidth}
        openLeft
        storeLocal="viewPanelWidth"
        minWidth={150}
        maxWidth={900}
        display={msgPanelOpen ? 'inline' : 'none'}
      />
      <Box
        height="100%"
        flexGrow={0}
        flexShrink={0}
        flexBasis={viewPanelWidth}
        width={viewPanelWidth}
        id="viewPanel"
        className={classes.flexItem}
      >
        <Typography>three</Typography>
      </Box>
    </Box>
  );
};

export default PanelsFlexbox;
