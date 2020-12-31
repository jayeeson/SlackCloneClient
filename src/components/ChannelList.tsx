import { List, ListItem, ListItemIcon, Collapse, Button, ListItemSecondaryAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatChannel, ChatServer } from '../types';
import AddChannelMenu from './AddChannelMenu';
import ChannelListItem from './ChannelListItem';
import ListItemTextNoWrap from './subcomponents/ListItemTextNoWrap';

interface ChannelListProps {
  channels: ChatChannel[];
  activeServer: ChatServer;
  addChannelMenuOpen: boolean;
  setAddChannelMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const useStyles = makeStyles({
  button: {
    width: '24px',
    minWidth: '24px',
    height: '24px',
  },
});

const ChannelList = ({ channels, activeServer, addChannelMenuOpen, setAddChannelMenuOpen }: ChannelListProps) => {
  const [channelCollapseOpen, setChannelCollapseOpen] = useState(true);
  const classes = useStyles();

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
      <ListItem
        button
        style={{ display: 'flex' }}
        disableRipple
        onClick={() => setChannelCollapseOpen(!channelCollapseOpen)}
      >
        <ListItemIcon>
          {channelCollapseOpen ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
        </ListItemIcon>
        <ListItemTextNoWrap style={{ flexGrow: 1 }}>Channels</ListItemTextNoWrap>
        <ListItemSecondaryAction>
          <Button className={classes.button} onClick={() => setAddChannelMenuOpen(true)}>
            <Add />
          </Button>
          <AddChannelMenu addChannelMenuOpen={addChannelMenuOpen} setAddChannelMenuOpen={setAddChannelMenuOpen} />
        </ListItemSecondaryAction>
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
  return {
    channels: Object.values(state.chat.channels),
    activeServer: state.chat.servers[state.chat.activeServerId],
  };
};

export default connect(mapStateToProps)(ChannelList);
