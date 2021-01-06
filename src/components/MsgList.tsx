import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatMessage, ChatUser } from '../types';

const useStyles = makeStyles({
  root: {
    maxHeight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    maxWidth: '100%',
    width: '100%',
    marginBottom: '1px',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    flexGrow: 1,
    alignSelf: 'flex-start',
  },
  displayName: {},
  timestamp: {
    paddingLeft: '1rem',
  },
  messageItem: {},
});

const MsgList = ({ messages, users }: { messages: ChatMessage[]; users: ChatUser[] }) => {
  const [listHeightBeforeNewMessageAdded, setListHeightBeforeNewMessageAdded] = useState(0);

  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (containerRef?.current && listRef?.current) {
      const { height: containerHeight } = containerRef.current.getBoundingClientRect();
      const { height: listHeight } = listRef.current.getBoundingClientRect();
      const { scrollTop } = containerRef.current;
      const tolerance = 12; //px
      if (
        scrollTop + tolerance >= listHeightBeforeNewMessageAdded - containerHeight &&
        listHeightBeforeNewMessageAdded > 100
      ) {
        containerRef.current.scrollBy(0, listHeight - listHeightBeforeNewMessageAdded);
      }
    }
  }, [messages, listHeightBeforeNewMessageAdded]);

  useEffect(() => {
    if (listRef?.current) {
      setListHeightBeforeNewMessageAdded(listRef.current.getBoundingClientRect().height);
    }
  }, [messages]);

  const renderMessageItem = (message: ChatMessage) => {
    const displayName = users.find(user => user.id === message.userId)?.displayName;
    return (
      <ListItem className={classes.messageItem} key={message.id}>
        <ListItemAvatar>
          <Avatar variant="rounded">{displayName?.length ? displayName.slice(0, 1).toLocaleUpperCase() : '?'}</Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <div>
              <Typography variant="h6" component="span" className={classes.displayName}>
                {displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span" className={classes.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString().split(/(?<=\d+:\d{2}):\d\d/)}
              </Typography>
            </div>
          }
          secondary={
            <Typography variant="body1" color="textPrimary">
              {message.content}
            </Typography>
          }
        />
      </ListItem>
    );
  };

  return (
    <div id="messageListContainer" ref={containerRef} className={classes.root}>
      <List id="messageList" ref={listRef}>
        {messages.map(renderMessageItem)}
      </List>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
    users: Object.values(state.chat.users),
  };
};

export default connect(mapStateToProps)(MsgList);
