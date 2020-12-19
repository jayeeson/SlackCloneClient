import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getOldestMessages } from '../store/chat';
import { ChatMessage } from '../types';

const useStyles = makeStyles({
  flexItem: {
    width: '100%',
    flex: '1 0',
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
  },
});

const MsgPanel = ({
  msgPanelOpen,
  messages,
  activeChannelId,
}: {
  msgPanelOpen: boolean;
  messages: ChatMessage[];
  activeChannelId: number;
}) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';

  useEffect(() => {
    ///todo: make more efficient, less calls to db
    dispatch(getOldestMessages({ quantity: 20 }));
  }, [activeChannelId, dispatch]);

  const renderMessageItem = (message: ChatMessage) => {
    return (
      <div>
        <p>{new Date(message.time).toLocaleDateString()}</p>
        <p>{message.content}</p>
      </div>
    );
  };

  const renderMessageList = () => {
    return <Fragment>{messages.map(renderMessageItem)}</Fragment>;
  };

  return (
    <Box className={classes.flexItem} id="msgPanel" display={display}>
      <Typography>{renderMessageList()}</Typography>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    msgPanelOpen: state.panels.msgPanel,
    messages: Object.values(state.chat.messages).filter(message => message.channelId === state.chat.activeChannelId),
    activeChannelId: state.chat.activeChannelId,
  };
};

export default React.memo(connect(mapStateToProps)(MsgPanel));
