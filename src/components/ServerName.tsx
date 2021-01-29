import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatServer } from '../types';

const useStyles = makeStyles({
  root: {
    height: 60,
    minHeight: 60,
    verticalAlign: 'middle',
  },
  content: {
    marginLeft: 18,
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
  },
});

const ServerName = ({ activeServer }: { activeServer: ChatServer }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography noWrap className={classes.content} variant="h6">
        {activeServer?.name ?? ''}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { activeServer: state.chat.servers[state.chat.activeServerId] };
};

export default connect(mapStateToProps)(ServerName);
