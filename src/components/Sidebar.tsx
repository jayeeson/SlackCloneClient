import { Box, Divider, List, ListItem, ListItemIcon, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import FieldIcon from './FieldIcon';
import { chatSlice } from '../store/chat';
import { ChatChannel, ChatServer } from '../types';

interface IProps {
  sidebarWidth: number;
  sidebarOpen: boolean;
  activeServer: ChatServer;
  channels: ChatChannel[];
  activeChannelId: number;
  setActiveChannel: typeof chatSlice.actions.setActiveChannel;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ sidebarWidth }: { sidebarWidth: number }) => ({
      width: sidebarWidth,
      background: theme.palette.background.default,
      height: '100%',
      boxSizing: 'border-box',
    }),
    truncated: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    serverNameContainer: {
      height: '60px',
      verticalAlign: 'middle',
    },
    serverNameContent: {
      marginLeft: 18,
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    channellistItem: {},
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen, activeChannelId, setActiveChannel, activeServer, channels }: IProps) => {
  const classList = useStyles({ sidebarWidth });
  const listItems = {
    general: [
      { text: 'Threads', channel: 1 },
      { text: 'Mentions', channel: 2 },
      { text: 'More', channel: 3 },
    ],
  };

  const onListItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: { text: string; channel: number }
  ) => {
    if (item.channel && activeChannelId !== item.channel) {
      setActiveChannel({ channelId: item.channel });
    }
  };

  const renderList = (list: { text: string; channel: number }[]) => (
    <List>
      {list.map(item => (
        <ListItem
          button
          disableRipple
          key={item.text}
          className={classList.truncated}
          selected={activeChannelId === item.channel}
          onClick={e => onListItemClick(e, item)}
        >
          <ListItemIcon>
            <FieldIcon name={item.text} />
            <Typography className={clsx(classList.truncated)}>{item.text}</Typography>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );

  const sidebarContent = (
    <div className={classList.root}>
      <div className={classList.serverNameContainer}>
        <Typography className={clsx(classList.truncated, classList.serverNameContent)} component="h2">
          {activeServer?.name ?? ''}
        </Typography>
      </div>
      <Divider />
      {renderList(listItems.general)}
    </div>
  );

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
      {sidebarContent}
    </Box>
  );
};

const mapDispatchToProps = {
  setActiveChannel: chatSlice.actions.setActiveChannel,
};

const mapStateToProps = (state: RootState) => {
  return {
    sidebarOpen: state.panels.sidebar,
    activeServer: state.chat.servers[state.chat.activeServerId],
    activeChannelId: state.chat.activeChannelId,
    channels: Object.values(state.chat.channels),
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
