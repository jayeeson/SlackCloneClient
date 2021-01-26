import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatUser } from '../types';
import IMsgPanel from './IMsgPanel';

const useStyles = makeStyles({
  displayName: {},
  timestamp: {
    paddingLeft: '1rem',
  },
  messageItem: {},
});

const MsgList = ({ users }: { users: ChatUser[] }) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <IMsgPanel header="All direct messages" setRef={containerRef}>
      <div id="messageListContainer">{`DM!!!!!!!!!!`}</div>
    </IMsgPanel>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    users: Object.values(state.chat.users),
  };
};

export default connect(mapStateToProps)(MsgList);
