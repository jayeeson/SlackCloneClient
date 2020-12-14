import { Box, Divider, Theme } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, Fragment } from 'react';
import DraggableDivider from './DraggableDivider';
import MsgPanel from './MsgPanel';
import useWindowSize from '../hooks/useWindowSize';
import { connect } from 'react-redux';
import { panelsSlice } from '../store/panels';
import { RootState } from '../store';
import Sidebar from './Sidebar';
import ViewPanel from './ViewPanel';
import ServerPanel from './ServerPanel';
import { DraggablePanel } from '../types';
import { sidebarTheme } from './themes/sidebar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.background.default,
  },
  flexItem: {
    margin: '0 0',
    padding: 0,
  },
}));

interface IProps {
  sidebarOpen: boolean;
  msgPanelOpen: boolean;
  viewPanelOpen: boolean;
  sidebarWidth: number;
  viewPanelWidth: number;
  doOpenMsgPanel: typeof panelsSlice.actions.doOpenMsgPanel;
  doCloseMsgPanel: typeof panelsSlice.actions.doCloseMsgPanel;
  doOpenSidebar: typeof panelsSlice.actions.doOpenSidebar;
  doCloseSidebar: typeof panelsSlice.actions.doCloseSidebar;
}

const PanelsFlexbox = ({
  sidebarOpen,
  msgPanelOpen,
  viewPanelOpen,
  sidebarWidth,
  viewPanelWidth,
  doOpenMsgPanel,
  doCloseMsgPanel,
  doOpenSidebar,
  doCloseSidebar,
}: IProps) => {
  const windowSize = useWindowSize();

  const minMsgPanelWidth = 300;
  const dividerWidth = 6;
  const serverPanelWidth = 60;

  useEffect(() => {
    const totalDividerWidth = (viewPanelOpen ? 2 : 1) * dividerWidth;
    const viewPanelWidthIfOpen = viewPanelOpen ? viewPanelWidth : 0;

    if (msgPanelOpen) {
      if (sidebarOpen && windowSize.x - sidebarWidth - viewPanelWidthIfOpen - totalDividerWidth < minMsgPanelWidth) {
        doCloseSidebar();
      } else if (
        !sidebarOpen &&
        sidebarWidth + minMsgPanelWidth + viewPanelWidthIfOpen + totalDividerWidth < windowSize.x
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

  const sidebarDividerPosition = serverPanelWidth + sidebarWidth + 2; // +2 for 2 dividers 1 px each
  const viewPanelDividerPosition = windowSize.x - viewPanelWidth - 1; // -1 for 1 divider 1 px

  return (
    <Fragment>
      <Box id="mainContentFlexbox" width="100%" display="flex" height="100vh" className={classes.root}>
        <ThemeProvider theme={sidebarTheme}>
          <ServerPanel width={serverPanelWidth} />
          <Divider orientation="vertical" />
          <Sidebar sidebarWidth={sidebarWidth} />
          <Divider orientation="vertical" /> {/*used for debugging layout*/}
        </ThemeProvider>
        <MsgPanel />
        <Divider orientation="vertical" /> {/*used for debugging layout*/}
        <ViewPanel viewPanelWidth={viewPanelWidth} />
      </Box>
      <DraggableDivider
        thisWidth={11}
        panel={DraggablePanel.sidebarWidth}
        minWidth={75}
        maxWidth={500}
        storeLocal
        position={sidebarDividerPosition}
      />
      <DraggableDivider
        thisWidth={11}
        openLeft
        storeLocal
        panel={DraggablePanel.viewPanelWidth}
        minWidth={150}
        maxWidth={900}
        position={viewPanelDividerPosition}
      />
    </Fragment>
  );
};

const mapDispatchToProps = {
  doOpenMsgPanel: panelsSlice.actions.doOpenMsgPanel,
  doCloseMsgPanel: panelsSlice.actions.doCloseMsgPanel,
  doOpenSidebar: panelsSlice.actions.doOpenSidebar,
  doCloseSidebar: panelsSlice.actions.doCloseSidebar,
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
    msgPanelOpen: state.panels.msgPanel,
    viewPanelOpen: state.panels.viewPanel,
    sidebarWidth: state.panels.sidebarWidth,
    viewPanelWidth: state.panels.viewPanelWidth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelsFlexbox);
