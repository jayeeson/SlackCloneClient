import React from 'react';
import { ListItem, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import FieldIcon from './FieldIcon';
import ListItemTextNoWrap from './subcomponents/ListItemTextNoWrap';
import { ChatChannel } from '../types';
import { chatSlice } from '../store/chat';
import { RootState } from '../store';
import { connect } from 'react-redux';

interface IProps {
  channel: ChatChannel;
  activeChannelId: number;
  setActiveChannel: typeof chatSlice.actions.setActiveChannel;
  userId: number | null;
}

const useStyles = makeStyles(theme =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const ChannelListItem = ({ channel, activeChannelId, setActiveChannel, userId }: IProps) => {
  const classes = useStyles();

  const onChannelItemClick = (channelId: number) => {
    if (activeChannelId !== channelId && userId) {
      setActiveChannel({ channelId, userId });
    }
  };

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
};

const mapStateToProps = (state: RootState) => {
  return {
    channels: state.chat.channels,
    activeChannelId: state.chat.activeChannelId,
    activeServer: state.chat.servers[state.chat.activeServerId],
    userId: state.chat.userId,
  };
};
export default connect(mapStateToProps, { setActiveChannel: chatSlice.actions.setActiveChannel })(ChannelListItem);
