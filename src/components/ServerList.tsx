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

interface useStyleProps {
  maxListHeight: number;
  serverIconWidth: number;
  isOverflown: boolean;
}
const useStyles = makeStyles(theme => ({
  root: ({ maxListHeight, isOverflown }: useStyleProps) => ({
    maxHeight: maxListHeight,
    overflowY: 'hidden',
    scrollbarWidth: 'thin',
    '&:hover': {
      overflowY: 'auto',
      ///\todo: fix how the panel moves when a scrollbar is added
      // marginLeft: isOverflown ? 8 : 0,
    },
  }),
  avatar: ({ serverIconWidth }: useStyleProps) => ({
    position: 'relative',
    transform: 'translateX(-50%)',
    left: '50%',
    color: theme.palette.primary.contrastText,
    height: serverIconWidth,
    width: serverIconWidth,
    boxSizing: 'content-box',
  }),
  activeServerAvatar: {
    border: `4px ${theme.palette.primary.main} solid`,
  },
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
  addServerButtonHeight,
}: {
  width: number;
  servers: ChatServer[];
  activeServerId: number;
  addServerButtonHeight: number;
}) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const [maxListHeight, setMaxListHeight] = useState(1000);

  const rootRef = useRef<HTMLUListElement | null>(null);
  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();
  const serverIconWidth = width * 0.55;
  const classes = useStyles({ serverIconWidth, isOverflown, maxListHeight });

  useEffect(() => {
    const container = rootRef.current;
    if (container) {
      setIsOverflown(container.scrollHeight > container.getBoundingClientRect().height);
    }

    setMaxListHeight(windowSize.y - addServerButtonHeight - width - 1 - 20);
  }, [addServerButtonHeight, width, windowSize.y]);

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
            className={clsx(
              classes.avatar,
              server.id == activeServerId ? classes.activeServerAvatar : classes.nonActiveServerAvatar
            )}
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
