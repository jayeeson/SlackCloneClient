import { Box, List, ListItem, ListItemText, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getOldestMessages, sendMessage } from '../store/chat';
import { ChatMessage } from '../types';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: '1 0',
    padding: 5,
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    display: 'flex',
  },
  messageFieldContainer: {
    width: '100%',
  },
  messageField: {
    margin: '0 auto',
    width: '100%',
  },
  messageItem: {},
});

const MsgPanel = ({
  msgPanelOpen,
  messages,
  activeChannelId,
  activeServerId,
}: {
  msgPanelOpen: boolean;
  width: number;
  messages: ChatMessage[];
  activeChannelId: number;
  activeServerId: number;
}) => {
  const [messageText, setMessageText] = useState('');

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';

  useEffect(() => {
    ///todo: make more efficient, less calls to db
    dispatch(getOldestMessages({ quantity: 20 }));
  }, [activeChannelId, dispatch]);

  const renderMessageItem = (message: ChatMessage) => {
    return (
      <ListItem className={classes.messageItem}>
        {/*\todo: getServerUsers {message.} */}
        <ListItemText
          primary={
            <div>
              <span>{new Date(message.time).toLocaleDateString()}</span>
              <span>{`\tuserid: ${message.userId}`}</span>
            </div>
          }
          secondary={message.content}
        />
      </ListItem>
    );
  };

  const renderMessageList = () => {
    return <List>{messages.map(renderMessageItem)}</List>;
  };

  const onMessageFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const onMessageFieldKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        return setMessageText(messageText + '\n');
      }
      onMessageSubmit();
    }
  };

  const onMessageSubmit = () => {
    dispatch(sendMessage({ channelId: activeChannelId, text: messageText, serverId: activeServerId }));
    setMessageText('');
  };

  return (
    <Box className={classes.root} id="msgPanel" display={display} flexDirection="column">
      <Box alignSelf="flex-start" flexGrow={1}>
        {renderMessageList()}
      </Box>
      <Box className={classes.messageFieldContainer} flexDirection="column" alignSelf="flex-end">
        <Paper>
          <TextField
            className={classes.messageField}
            multiline
            color="primary"
            variant="outlined"
            value={messageText}
            onKeyPress={e => onMessageFieldKeyPress(e)}
            onChange={e => onMessageFieldChange(e)}
          />
        </Paper>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    msgPanelOpen: state.panels.msgPanel,
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
    activeChannelId: state.chat.activeChannelId,
    activeServerId: state.chat.activeServerId,
  };
};

export default React.memo(connect(mapStateToProps)(MsgPanel));
