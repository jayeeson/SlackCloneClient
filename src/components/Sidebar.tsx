import { Box, Divider } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { createChannel } from '../store/chat';
import ChannelList from './ChannelList';
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
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen }: IProps) => {
  const [addChannelMenuOpen, setAddChannelMenuOpen] = useState(false);
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
    >
      <div className={classes.root}>
        <ServerName />
        <Divider />
        <ChannelList addChannelMenuOpen={addChannelMenuOpen} setAddChannelMenuOpen={setAddChannelMenuOpen} />
      </div>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
  };
};

export default React.memo(connect(mapStateToProps)(Sidebar));
