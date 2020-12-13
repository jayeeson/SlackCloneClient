import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
