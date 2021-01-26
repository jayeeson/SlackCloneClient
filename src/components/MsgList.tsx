import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatChannel, ChatMessage, ChatUser } from '../types';
import IMsgPanel from './IMsgPanel';

const useStyles = makeStyles({
  timestamp: {
    paddingLeft: '1rem',
  },
});

const MsgList = ({
  messages,
  users,
  activeChannel,
}: {
  messages: ChatMessage[];
  users: ChatUser[];
  activeChannel: ChatChannel | undefined;
}) => {
  const [listHeightBeforeNewMessageAdded, setListHeightBeforeNewMessageAdded] = useState(0);

  const classes = useStyles();
  const containerRef = createRef<HTMLDivElement>();
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
  }, [messages, listHeightBeforeNewMessageAdded, containerRef]);

  useEffect(() => {
    if (listRef?.current) {
      setListHeightBeforeNewMessageAdded(listRef.current.getBoundingClientRect().height);
    }
  }, [messages]);

  const renderMessageItem = (message: ChatMessage) => {
    const displayName = users.find(user => user.id === message.userId)?.displayName;
    return (
      <ListItem key={message.id}>
        <ListItemAvatar>
          <Avatar variant="rounded">{displayName?.length ? displayName.slice(0, 1).toLocaleUpperCase() : '?'}</Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <div>
              <Typography variant="h6" component="span">
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
    <IMsgPanel header={`#${activeChannel?.name}`} setRef={containerRef}>
      <List id="messageList" ref={listRef}>
        {messages.map(renderMessageItem)}
      </List>
    </IMsgPanel>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
    users: Object.values(state.chat.users),
    activeChannel: Object.values(state.chat.channels).find(channel => channel.id === state.chat.activeChannelId),
  };
};

export default connect(mapStateToProps)(MsgList);
