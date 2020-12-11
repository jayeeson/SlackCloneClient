import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { memo } from 'react';

const useStyles = makeStyles(theme => ({
  flexItem: ({ width }: { width: number }) => ({
    height: '100%',
    width: width,
    flex: `0 0 50`,
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
    borderRight: `1px solid ${theme.palette.divider}`,
  }),
}));

const ServerPanel = ({ width }: { width: number }) => {
  const classes = useStyles({ width });
  return (
    <Box id="serverPanel" className={classes.flexItem}>
      <Typography>SM</Typography>
    </Box>
  );
};

export default memo(ServerPanel);
