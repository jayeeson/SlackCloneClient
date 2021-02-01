import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatMessage, ChatUser } from '../types';

const useStyles = makeStyles({
  timestamp: {
    paddingLeft: '1rem',
  },
});

const DirectMessageChannelListItem = ({ message, users }: { message: ChatMessage; users: ChatUser[] }) => {
  const displayName = users.find(user => user.id === message.userId)?.displayName;
  const classes = useStyles();

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

const mapStateToProps = (state: RootState) => {
  return {
    users: Object.values(state.chat.users),
  };
};

export default connect(mapStateToProps)(DirectMessageChannelListItem);
