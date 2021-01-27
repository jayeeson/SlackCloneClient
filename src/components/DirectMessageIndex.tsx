import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { ChatUser } from '../types';
import IMainPanelContent from './subcomponents/IMainPanelContent';

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
    <IMainPanelContent header="All direct messages" setRef={containerRef}>
      <div id="messageListContainer">{`DM!!!!!!!!!!`}</div>
    </IMainPanelContent>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    users: Object.values(state.chat.users),
  };
};

export default connect(mapStateToProps)(MsgList);
