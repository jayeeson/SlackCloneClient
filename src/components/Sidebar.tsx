import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  Typography,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import clsx from 'clsx';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import FieldIcon from './FieldIcon';
import { chatSlice } from '../store/chat';
import { ChatChannel, ChatServer } from '../types';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ListItemTextNoWrap from './subcomponents/ListItemTextNoWrap';

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
    channelNames: {
      marginLeft: '10px',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen, activeChannelId, setActiveChannel, activeServer, channels }: IProps) => {
  const [channelCollapseOpen, setChannelCollapseOpen] = useState(true);
  const classes = useStyles({ sidebarWidth });

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

  const onChannelItemClick = (channelId: number) => {
    if (activeChannelId !== channelId) {
      setActiveChannel({ channelId });
    }
  };

  const renderChannelsListItems = () => {
    const channelsInThisServer = channels.filter(channel => channel.serverId === activeServer.id);
    return (
      <Fragment>
        {channelsInThisServer.map(channel => {
          return (
            <ListItem
              button
              className={classes.nested}
              selected={activeChannelId === channel.id}
              onClick={() => onChannelItemClick(channel.id)}
            >
              <ListItemIcon>
                <FieldIcon name="pound" />
              </ListItemIcon>
              <ListItemTextNoWrap>{channel.name}</ListItemTextNoWrap>
            </ListItem>
          );
        })}
      </Fragment>
    );
  };

  const renderList = (list: { text: string; channel: number }[]) => (
    <List>
      {list.map(item => (
        <ListItem
          button
          disableRipple
          key={item.text}
          selected={activeChannelId === item.channel}
          onClick={e => onListItemClick(e, item)}
        >
          <ListItemIcon>
            <FieldIcon name={item.text} />
          </ListItemIcon>
          <ListItemTextNoWrap>{item.text}</ListItemTextNoWrap>
        </ListItem>
      ))}
      <ListItem button disableRipple onClick={() => setChannelCollapseOpen(!channelCollapseOpen)}>
        <ListItemIcon>
          {channelCollapseOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
        </ListItemIcon>
        <ListItemTextNoWrap>Channels</ListItemTextNoWrap>
      </ListItem>
      <Collapse in={channelCollapseOpen} timeout="auto">
        <List component="div" disablePadding>
          {renderChannelsListItems()}
        </List>
      </Collapse>
    </List>
  );

  const sidebarContent = (
    <div className={classes.root}>
      <div className={classes.serverNameContainer}>
        <Typography className={clsx(classes.truncated, classes.serverNameContent)} variant="h6">
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
