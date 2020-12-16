import { Avatar } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { ChatServer } from '../types';
import toAcronym from '../utils/toAcronym';
import { chatSlice } from '../store/chat';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: '100%',
      padding: 0,
      margin: '0 0',
      boxSizing: 'border-box',
      background: theme.palette.background.default,
    },
    avatar: ({ serverIconWidth, marginTop }: { serverIconWidth: number; marginTop: number }) => ({
      color: theme.palette.primary.contrastText,
      position: 'relative',
      transform: 'translateX(-50%)',
      left: '50%',
      marginTop: marginTop,
      height: serverIconWidth,
      width: serverIconWidth,
      '&:hover': {
        cursor: 'pointer',
      },
    }),
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
  const marginTop = (width - serverIconWidth) / 2;
  const classes = useStyles({ serverIconWidth, marginTop });

  // useEffect(() => {
  //   //get server items ? no it should already be there....
  // }, []);

  const onServerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, serverId: number) => {
    console.log('serverid', serverId);
    dispatch(chatSlice.actions.setActiveServer({ serverId }));
  };

  const renderServerItem = () => {
    console.log('servers');
    console.log(servers);
    return servers.map(server => {
      return (
        <Avatar variant="rounded" className={classes.avatar} onClick={e => onServerClick(e, server.id)}>
          {toAcronym(server.name)}
        </Avatar>
      );
    });
  };

  return <div className={classes.root}>{renderServerItem()}</div>;
};

const mapStateToProps = (state: RootState) => {
  return { servers: Object.values(state.chat.servers), activeServerId: state.chat.activeServerId };
};

export default connect(mapStateToProps)(ServerList);
