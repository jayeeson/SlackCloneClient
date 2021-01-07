import { Box, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../store';
import { connect } from 'react-redux';
import { getLatestMessagesForChannel, sendMessage } from '../store/chat';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: '1 0',
    padding: 5,
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
  },
  messageFieldContainer: {
    width: '100%',
    padding: '0 10px 10px',
  },
  messageField: {
    width: '100%',
  },
});

const MsgField = ({ activeChannelId, activeServerId }: { activeChannelId: number; activeServerId: number }) => {
  const [messageText, setMessageText] = useState('');
  const dispatch = useAppDispatch();
  const classes = useStyles();

  useEffect(() => {
    ///todo: make more efficient, less calls to db
    // make call to get messages form this channel.... later only if needed (at top of oldest messages)
    if (activeChannelId > 0) {
      dispatch(getLatestMessagesForChannel({ channelId: activeChannelId, quantity: 10 }));
    }
  }, [activeChannelId, dispatch]);

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
    <Box className={classes.messageFieldContainer} flexDirection="column" alignSelf="flex-end">
      <Paper elevation={0}>
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
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    activeChannelId: state.chat.activeChannelId,
    activeServerId: state.chat.activeServerId,
  };
};

export default connect(mapStateToProps)(MsgField);
