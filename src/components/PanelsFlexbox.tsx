import { Box, Divider, Theme } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, Fragment } from 'react';
import DraggableDivider from './DraggableDivider';
import MainPanel from './MainPanel';
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
    overflow: 'hidden',
  },
  flexItem: {
    margin: '0 0',
    padding: 0,
  },
}));

interface IProps {
  sidebarOpen: boolean;
  mainPanelOpen: boolean;
  viewPanelOpen: boolean;
  sidebarWidth: number;
  viewPanelWidth: number;
  doOpenMainPanel: typeof panelsSlice.actions.doOpenMainPanel;
  doCloseMainPanel: typeof panelsSlice.actions.doCloseMainPanel;
  doOpenSidebar: typeof panelsSlice.actions.doOpenSidebar;
  doCloseSidebar: typeof panelsSlice.actions.doCloseSidebar;
}

const PanelsFlexbox = ({
  sidebarOpen,
  mainPanelOpen,
  viewPanelOpen,
  sidebarWidth,
  viewPanelWidth,
  doOpenMainPanel,
  doCloseMainPanel,
  doOpenSidebar,
  doCloseSidebar,
}: IProps) => {
  const windowSize = useWindowSize();

  const minMainPanelWidth = 300;
  const dividerWidth = 6;
  const serverPanelWidth = 60;

  useEffect(() => {
    const totalDividerWidth = (viewPanelOpen ? 2 : 1) * dividerWidth;
    const viewPanelWidthIfOpen = viewPanelOpen ? viewPanelWidth : 0;

    if (mainPanelOpen) {
      if (sidebarOpen && windowSize.x - sidebarWidth - viewPanelWidthIfOpen - totalDividerWidth < minMainPanelWidth) {
        doCloseSidebar();
      } else if (
        !sidebarOpen &&
        sidebarWidth + minMainPanelWidth + viewPanelWidthIfOpen + totalDividerWidth < windowSize.x
      ) {
        doOpenSidebar();
      }
    }
  }, [
    doCloseSidebar,
    doOpenSidebar,
    mainPanelOpen,
    sidebarOpen,
    sidebarWidth,
    viewPanelOpen,
    viewPanelWidth,
    windowSize.x,
  ]);

  useEffect(() => {
    if (
      viewPanelOpen &&
      mainPanelOpen &&
      windowSize.x - viewPanelWidth - dividerWidth < minMainPanelWidth &&
      !sidebarOpen
    ) {
      doCloseMainPanel();
    } else if (!viewPanelOpen || (!mainPanelOpen && windowSize.x > viewPanelWidth + minMainPanelWidth + dividerWidth)) {
      doOpenMainPanel();
    }
  }, [doCloseMainPanel, doOpenMainPanel, mainPanelOpen, sidebarOpen, viewPanelOpen, viewPanelWidth, windowSize.x]);

  const classes = useStyles({ sidebar: { width: sidebarWidth }, viewPanel: { width: viewPanelWidth } });

  const sidebarDividerPosition = serverPanelWidth + sidebarWidth + 2; // +2 for 2 dividers 1 px each
  const viewPanelDividerPosition = windowSize.x - viewPanelWidth - 1; // -1 for 1 divider 1 px
  const mainPanelWidth =
    windowSize.x -
    (serverPanelWidth + 1) -
    (sidebarOpen ? sidebarWidth + 1 : 0) -
    (viewPanelOpen ? viewPanelWidth + 1 : 0);

  return (
    <Fragment>
      <Box id="mainContentFlexbox" width="100vw" display="flex" height="100vh" className={classes.root}>
        <ThemeProvider theme={sidebarTheme}>
          <ServerPanel width={serverPanelWidth} />
          <Divider orientation="vertical" />
          <Sidebar sidebarWidth={sidebarWidth} />
          <Divider orientation="vertical" />
        </ThemeProvider>
        <MainPanel width={mainPanelWidth} />
        <Divider orientation="vertical" />
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
  doOpenMainPanel: panelsSlice.actions.doOpenMainPanel,
  doCloseMainPanel: panelsSlice.actions.doCloseMainPanel,
  doOpenSidebar: panelsSlice.actions.doOpenSidebar,
  doCloseSidebar: panelsSlice.actions.doCloseSidebar,
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
    mainPanelOpen: state.panels.mainPanel,
    viewPanelOpen: state.panels.viewPanel,
    sidebarWidth: state.panels.sidebarWidth,
    viewPanelWidth: state.panels.viewPanelWidth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelsFlexbox);
