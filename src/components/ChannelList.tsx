import { List, ListItem, ListItemIcon, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatChannel, ChatServer } from '../types';
import ChannelListItem from './ChannelListItem';
import ListItemTextNoWrap from './subcomponents/ListItemTextNoWrap';

interface ChannelListProps {
  channels: ChatChannel[];
  activeServer: ChatServer;
}

const ChannelList = ({ channels, activeServer }: ChannelListProps) => {
  const [channelCollapseOpen, setChannelCollapseOpen] = useState(true);

  const renderChannelList = () => {
    const channelsInThisServer = channels.filter(channel => channel.serverId === activeServer?.id);
    return (
      <Fragment>
        {channelsInThisServer.map(channel => {
          return <ChannelListItem channel={channel} />;
        })}
      </Fragment>
    );
  };

  return (
    <List>
      <ListItem button disableRipple onClick={() => setChannelCollapseOpen(!channelCollapseOpen)}>
        <ListItemIcon>
          {channelCollapseOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
        </ListItemIcon>
        <ListItemTextNoWrap>Channels</ListItemTextNoWrap>
      </ListItem>
      <Collapse in={channelCollapseOpen} timeout="auto">
        <List component="div" disablePadding>
          {renderChannelList()}
        </List>
      </Collapse>
    </List>
  );
};

const mapStateToProps = (state: RootState) => {
  return { channels: Object.values(state.chat.channels), activeServer: state.chat.servers[state.chat.activeServerId] };
};

export default connect(mapStateToProps)(ChannelList);
