import { Avatar, List, ListItem } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { ChatServer } from '../types';
import { toAcronym } from '../utils/text';
import clsx from 'clsx';
import { setActiveServer } from '../store/chat';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxHeight: '80vh',
      overflowY: 'auto',
    },
    avatar: ({ serverIconWidth }: { serverIconWidth: number }) => ({
      position: 'relative',
      transform: 'translateX(-50%)',
      left: '50%',
      color: theme.palette.primary.contrastText,
      height: serverIconWidth,
      width: serverIconWidth,
    }),
    nonActiveServerAvatar: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  })
);

const ServerList = ({
  width,
  servers,
  activeServerId,
}: {
  width: number;
  servers: ChatServer[];
  activeServerId: number;
}) => {
  const dispatch = useAppDispatch();

  const serverIconWidth = width * 0.55;
  const classes = useStyles({ serverIconWidth });

  const onServerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, serverId: number) => {
    if (activeServerId !== serverId) {
      dispatch(setActiveServer({ serverId }));
    }
  };

  const renderServerItems = () => {
    return servers.map(server => {
      return (
        <ListItem>
          <Avatar
            variant="rounded"
            className={clsx(classes.avatar, server.id !== activeServerId && classes.nonActiveServerAvatar)}
            onClick={e => onServerClick(e, server.id)}
          >
            {toAcronym(server.name)}
          </Avatar>
        </ListItem>
      );
    });
  };

  return <List className={classes.root}>{renderServerItems()}</List>;
};

const mapStateToProps = (state: RootState) => {
  return { servers: Object.values(state.chat.servers), activeServerId: state.chat.activeServerId };
};

export default connect(mapStateToProps)(ServerList);
