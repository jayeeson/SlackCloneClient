import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import MsgField from './MsgField';
import MsgList from './MsgList';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: '1 0',
    padding: 5,
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
  },
});

const MsgPanel = ({ msgPanelOpen }: { msgPanelOpen: boolean; width: number }) => {
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';

  return (
    <Box className={classes.root} id="msgPanel" display={display} flexDirection="column">
      <MsgList />
      <MsgField />
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    msgPanelOpen: state.panels.msgPanel,
  };
};

export default React.memo(connect(mapStateToProps)(MsgPanel));
