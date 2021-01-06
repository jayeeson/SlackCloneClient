import { Box, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import ChannelPanel from './ChannelPanel';
import ServerName from './ServerName';

interface IProps {
  sidebarWidth: number;
  sidebarOpen: boolean;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ sidebarWidth }: { sidebarWidth: number }) => ({
      width: sidebarWidth,
      background: theme.palette.background.default,
      height: '100%',
      boxSizing: 'border-box',
    }),
    verticalFlexbox: {
      height: '100%',
    },
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen }: IProps) => {
  const classes = useStyles({ sidebarWidth });

  return (
    <Box
      height="100%"
      flexGrow={0}
      flexShrink={0}
      flexBasis={sidebarWidth}
      width={sidebarWidth}
      id="sidebar"
      display={sidebarOpen ? 'inline' : 'none'}
      className={classes.root}
    >
      <Box display="flex" flexDirection="column" flexGrow={1} flexShrink={0} className={classes.verticalFlexbox}>
        <ServerName />
        <Divider />
        <ChannelPanel />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
  };
};

export default React.memo(connect(mapStateToProps)(Sidebar));
