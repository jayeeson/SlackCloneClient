import { Avatar, Box, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

const useStyles = makeStyles(theme => ({
  flexItem: ({ width }: { width: number }) => ({
    height: '100%',
    width: width,
    flex: `0 0 ${width}`,
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
  }),
  userAvatarContainer: ({ width }: { width: number }) => ({
    height: width,
    boxSizing: 'border-box',
  }),
  userAvatarButton: {
    position: 'relative',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const ServerPanel = ({ width }: { width: number }) => {
  const classes = useStyles({ width });
  return (
    <Box id="serverPanel" className={classes.flexItem}>
      <div className={classes.userAvatarContainer}>
        <Avatar className={classes.userAvatarButton} src="///\todoimplementimages.jpg" />
      </div>
      <Divider />
    </Box>
  );
};

export default memo(ServerPanel);
