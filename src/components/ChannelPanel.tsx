import { List, ListItem, ListItemIcon, Collapse, Button, ListItemSecondaryAction, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, ExpandLess, ExpandMore } from '@material-ui/icons';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatChannel, ChatServer } from '../types';
import { colorHexAdder } from '../utils/colorTransform';
import AddChannelMenu from './AddChannelMenu';
import AddMemberToServerMenu from './AddMemberToServerMenu';
import ChannelListItem from './ChannelListItem';
import ListItemTextNoWrap from './subcomponents/ListItemTextNoWrap';

interface ChannelListProps {
  channels: ChatChannel[];
  activeServer: ChatServer;
}

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 0 0',
    maxHeight: '100%',
    overflowY: 'hidden',
    scrollbarWidth: 'thin',
    '&:hover': {
      overflowY: 'auto',
    },
  },
  button: {
    width: 40,
    minWidth: 40,
    height: 40,
  },
  addMembersButtonRoot: {
    width: 23,
    height: 23,
  },
  addMembersButtonColorDefault: {
    color: theme.palette.text.primary,
    backgroundColor: colorHexAdder(theme.palette.background.default, '#353535'),
  },
  channelCollapseListItem: {
    transition: undefined,
    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
}));

const ChannelPanel = ({ channels, activeServer }: ChannelListProps) => {
  const [addChannelMenuOpen, setAddChannelMenuOpen] = useState(false);
  const [addMemberMenuOpen, setAddMemberMenuOpen] = useState(false);
  const [channelCollapseOpen, setChannelCollapseOpen] = useState(true);
  const classes = useStyles();

  const channelList = () => {
    return (
      <Fragment>
        <ListItem
          button
          style={{ display: 'flex' }}
          disableRipple
          onClick={() => setChannelCollapseOpen(!channelCollapseOpen)}
          classes={{ button: classes.channelCollapseListItem }}
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
      </Fragment>
    );
  };

  const renderChannelList = () => {
    const channelsInThisServer = channels.filter(channel => channel.serverId === activeServer?.id);
    return (
      <Fragment>
        {channelsInThisServer.map(channel => {
          return <ChannelListItem channel={channel} key={channel.id} />;
        })}
      </Fragment>
    );
  };

  const renderAddMemberButton = () => {
    return (
      <Fragment>
        <ListItem button style={{ display: 'flex' }} disableRipple onClick={() => setAddMemberMenuOpen(true)}>
          <ListItemIcon>
            <Avatar
              classes={{ root: classes.addMembersButtonRoot, colorDefault: classes.addMembersButtonColorDefault }}
              variant="rounded"
            >
              <Add fontSize="small" />
            </Avatar>
          </ListItemIcon>
          <ListItemTextNoWrap style={{ flexGrow: 1 }}>Add members</ListItemTextNoWrap>
        </ListItem>
        <AddMemberToServerMenu menuOpen={addMemberMenuOpen} setMenuOpen={setAddMemberMenuOpen} />
      </Fragment>
    );
  };

  return (
    <List className={classes.root}>
      {channelList()}
      {renderAddMemberButton()}
    </List>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    channels: Object.values(state.chat.channels),
    activeServer: state.chat.servers[state.chat.activeServerId],
  };
};

export default connect(mapStateToProps)(ChannelPanel);
