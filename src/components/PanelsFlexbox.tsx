import { Box, makeStyles, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import validateWidth from '../utils/validateWidth';
import Divider from './Divider';
import MsgPanel from './MsgPanel';
import useWindowSize from '../hooks/useWindowSize';
import { connect } from 'react-redux';
import { panelsSlice } from '../store/panels';
import { RootState } from '../store';

const useStyles = makeStyles(() => ({
  root: {
    background: 'linear-gradient(180deg, #636363 30%, #333333 90%)',
  },
  flexItem: {
    margin: '0 0',
    padding: 0,
  },
}));

const storageItems = {
  sidebarWidth: 'sidebarWidth',
  viewPaneWidth: 'viewPanelWidth',
};

interface IProps {
  sidebarOpen: boolean;
  msgPanelOpen: boolean;
  viewPanelOpen: boolean;
  doOpenMsgPanel: typeof panelsSlice.actions.doOpenMsgPanel;
  doCloseMsgPanel: typeof panelsSlice.actions.doCloseMsgPanel;
  doOpenSidebar: typeof panelsSlice.actions.doOpenSidebar;
  doCloseSidebar: typeof panelsSlice.actions.doCloseSidebar;
  doOpenViewPanel: typeof panelsSlice.actions.doOpenViewPanel;
  doCloseViewPanel: typeof panelsSlice.actions.doCloseViewPanel;
}

const PanelsFlexbox = ({
  sidebarOpen,
  msgPanelOpen,
  viewPanelOpen,
  doOpenMsgPanel,
  doCloseMsgPanel,
  doOpenSidebar,
  doCloseSidebar,
  doOpenViewPanel,
  doCloseViewPanel,
}: IProps) => {
  const [sidebarWidth, setSidebarWidth] = useState(
    validateWidth(localStorage.getItem(storageItems.sidebarWidth)) || 250
  );
  const [viewPanelWidth, setviewPanelWidth] = useState(
    validateWidth(localStorage.getItem(storageItems.viewPaneWidth)) || 250
  );
  const windowSize = useWindowSize();
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
        doCloseSidebar();
      } else if (
        !sidebarOpen &&
        sidebarWidth +
          minMsgPanelWidth +
          (viewPanelOpen ? viewPanelWidth : 0) +
          (viewPanelOpen ? 2 : 1) * dividerWidth <
          windowSize.x
      ) {
        doOpenSidebar();
      }
    }
  }, [
    doCloseSidebar,
    doOpenSidebar,
    msgPanelOpen,
    sidebarOpen,
    sidebarWidth,
    viewPanelOpen,
    viewPanelWidth,
    windowSize.x,
  ]);

  useEffect(() => {
    if (
      viewPanelOpen &&
      msgPanelOpen &&
      windowSize.x - viewPanelWidth - dividerWidth < minMsgPanelWidth &&
      !sidebarOpen
    ) {
      doCloseMsgPanel();
    } else if (!viewPanelOpen || (!msgPanelOpen && windowSize.x > viewPanelWidth + minMsgPanelWidth + dividerWidth)) {
      doOpenMsgPanel();
    }
  }, [doCloseMsgPanel, doOpenMsgPanel, msgPanelOpen, sidebarOpen, viewPanelOpen, viewPanelWidth, windowSize.x]);

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

const mapDispatchToProps = {
  doOpenMsgPanel: panelsSlice.actions.doOpenMsgPanel,
  doCloseMsgPanel: panelsSlice.actions.doCloseMsgPanel,
  doOpenSidebar: panelsSlice.actions.doOpenSidebar,
  doCloseSidebar: panelsSlice.actions.doCloseSidebar,
  doOpenViewPanel: panelsSlice.actions.doOpenViewPanel,
  doCloseViewPanel: panelsSlice.actions.doCloseViewPanel,
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
    msgPanelOpen: state.panels.msgPanel,
    viewPanelOpen: state.panels.viewPanel,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelsFlexbox);
