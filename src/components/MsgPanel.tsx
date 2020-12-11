import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

const useStyles = makeStyles({
  flexItem: {
    width: '100%',
    flex: '1 0',
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
  },
});

const MsgPanel = ({ msgPanelOpen }: { msgPanelOpen: boolean }) => {
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';
  return (
    <Box className={classes.flexItem} id="msgPanel" display={display}>
      <Typography>Two</Typography>
    </Box>
  );
};
const mapStateToProps = (state: RootState) => {
  return { msgPanelOpen: state.panels.msgPanel };
};

export default React.memo(connect(mapStateToProps)(MsgPanel));
