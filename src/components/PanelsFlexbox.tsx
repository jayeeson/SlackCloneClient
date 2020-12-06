import { Box, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import validateWidth from '../utils/validateWidth';
import Divider from './Divider';
import MsgPanel from './MsgPanel';
import { debounce } from '../utils/debounce';

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(180deg, #636363 30%, #333333 90%)',
  },
  flexItem: {
    margin: '0 0',
    padding: 0,
  },
}));

const PanelsFlexbox = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewPanelOpen, setViewPanelOpen] = useState(false);
  const [msgPanelOpen, setMsgPanelOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(validateWidth(localStorage.getItem('sidebarWidth')) || 250);
  const [viewPanelWidth, setviewPanelWidth] = useState(validateWidth(localStorage.getItem('viewPanelWidth')) || 250);
  const [windowSize, setWindowSize] = useState({ x: window.innerWidth, y: window.innerHeight });
  const theme = useTheme();

  const minMsgPanelWidth = 300;
  const dividerWidth = 6;

  useEffect(() => {
    if (msgPanelOpen) {
      if (
        sidebarOpen &&
        windowSize.x - sidebarWidth - (viewPanelOpen ? viewPanelWidth : 0) - (viewPanelOpen ? 2 : 1) * dividerWidth <
          minMsgPanelWidth
      ) {
        setSidebarOpen(false);
      } else if (
        !sidebarOpen &&
        sidebarWidth +
          minMsgPanelWidth +
          (viewPanelOpen ? viewPanelWidth : 0) +
          (viewPanelOpen ? 2 : 1) * dividerWidth <
          windowSize.x
      ) {
        setSidebarOpen(true);
      }
    }
  }, [msgPanelOpen, sidebarOpen, sidebarWidth, viewPanelOpen, viewPanelWidth, windowSize.x]);

  useEffect(() => {
    if (
      viewPanelOpen &&
      msgPanelOpen &&
      windowSize.x - viewPanelWidth - dividerWidth < minMsgPanelWidth &&
      !sidebarOpen
    ) {
      setMsgPanelOpen(false);
    } else if (!viewPanelOpen || (!msgPanelOpen && windowSize.x > viewPanelWidth + minMsgPanelWidth + dividerWidth)) {
      setMsgPanelOpen(true);
    }
  }, [msgPanelOpen, sidebarOpen, viewPanelOpen, viewPanelWidth, windowSize.x]);

  useEffect(() => {
    const setSizeCallback = debounce(() => {
      const newWindowSize = { x: window.innerWidth, y: window.innerHeight };
      if (
        newWindowSize.x > 0 &&
        newWindowSize.y > 0 &&
        (windowSize.x !== newWindowSize.x || windowSize.y !== newWindowSize.y)
      ) {
        setWindowSize(newWindowSize);
      }
    }, 200);
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
      <MsgPanel display={msgPanelOpen ? 'inline' : 'none'} />
      <Divider
        width={viewPanelWidth}
        setWidth={setviewPanelWidth}
        openLeft
        storeLocal="viewPanelWidth"
        minWidth={150}
        maxWidth={900}
        display={msgPanelOpen && viewPanelOpen ? 'inline' : 'none'}
      />
      <Box
        height="100%"
        flexGrow={0}
        flexShrink={0}
        flexBasis={viewPanelWidth}
        width={viewPanelWidth}
        id="viewPanel"
        className={classes.flexItem}
        display={viewPanelOpen ? 'inline' : 'none'}
      >
        <Typography>three</Typography>
      </Box>
    </Box>
  );
};

export default PanelsFlexbox;
