import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {},
  flexItem: {
    width: '100%',
    flex: '1 0',
    padding: 0,
    margin: '0 0',
  },
});

const MsgPanel = ({ display }: { display: any }) => {
  const classes = useStyles();
  return (
    <div id="msgPanel" className={classes.flexItem} style={{ display: display }}>
      <Box width="100%">two</Box>
    </div>
  );
};

export default React.memo(MsgPanel);
