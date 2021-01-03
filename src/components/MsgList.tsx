import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatMessage } from '../types';

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
  },
  messageItem: {},
});

const MessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const classes = useStyles();

  const renderMessageItem = (message: ChatMessage) => {
    return (
      <ListItem className={classes.messageItem}>
        {/*\todo: getServerUsers {message.} */}
        <ListItemText
          primary={
            <div>
              <span>{new Date(message.timestamp).toLocaleDateString()}</span>
              <span>{`\tuserid: ${message.displayName}`}</span>
            </div>
          }
          secondary={message.content}
        />
      </ListItem>
    );
  };

  return (
    <Box alignSelf="flex-start" flexGrow={1} className={classes.root}>
      <List>{messages.map(renderMessageItem)}</List>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
  };
};

export default connect(mapStateToProps)(MessageList);
