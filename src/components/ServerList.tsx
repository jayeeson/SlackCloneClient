import { Avatar, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { ChatServer } from '../types';
import { toAcronym } from '../utils/text';
import clsx from 'clsx';
import { setActiveServer } from '../store/chat';
import useWindowSize from '../hooks/useWindowSize';

const useStyles = makeStyles(theme => ({
  root: (props: any) => ({
    maxHeight: '80vh',
    overflowY: 'hidden',
    scrollbarWidth: 'thin',
    '&:hover': {
      overflowY: 'auto',
      marginLeft: props.isOverflown ? 8 : 0,
    },
  }),
  avatar: (props: any) => ({
    position: 'relative',
    transform: 'translateX(-50%)',
    left: '50%',
    color: theme.palette.primary.contrastText,
    height: props.serverIconWidth,
    width: props.serverIconWidth,
  }),
  nonActiveServerAvatar: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ServerList = ({
  width,
  servers,
  activeServerId,
}: {
  width: number;
  servers: ChatServer[];
  activeServerId: number;
}) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const rootRef = useRef<HTMLUListElement | null>(null);
  const dispatch = useAppDispatch();
  const serverIconWidth = width * 0.55;
  const windowSize = useWindowSize();
  const classes = useStyles({ serverIconWidth, isOverflown });

  useEffect(() => {
    const container = rootRef.current;
    if (container) {
      setIsOverflown(container.scrollHeight > container.getBoundingClientRect().height);
    }
  }, [windowSize.y]);

  const onServerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, serverId: number) => {
    if (activeServerId !== serverId) {
      dispatch(setActiveServer({ serverId }));
    }
  };

  const renderServerItems = () => {
    return servers.map(server => {
      return (
        <ListItem key={server.id}>
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

  return (
    <List id="serverList" ref={rootRef} className={classes.root}>
      {renderServerItems()}
    </List>
  );
};

const mapStateToProps = (state: RootState) => {
  return { servers: Object.values(state.chat.servers), activeServerId: state.chat.activeServerId };
};

export default connect(mapStateToProps)(ServerList);
