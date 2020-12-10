import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

const useStyles = makeStyles({
  root: {},
  flexItem: {
    width: '100%',
    flex: '1 0',
    padding: 0,
    margin: '0 0',
  },
});

const MsgPanel = ({ msgPanelOpen }: { msgPanelOpen: boolean }) => {
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';
  return (
    <div id="msgPanel" className={classes.flexItem} style={{ display }}>
      <Box width="100%">two</Box>
    </div>
  );
};
const mapStateToProps = (state: RootState) => {
  return { msgPanelOpen: state.panels.msgPanel };
};

export default React.memo(connect(mapStateToProps)(MsgPanel));
