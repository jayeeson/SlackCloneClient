import { Avatar, Box, Divider, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import { useAppDispatch } from '../store';
import { logout } from '../store/auth';
import StyledMenu from './subcomponents/StyledMenu';
import StyledMenuItem from './subcomponents/StyledMenuItem';

const useStyles = makeStyles(theme => ({
  root: ({ width }: { width: number }) => ({
    height: '100%',
    width: width,
    flex: `0 0 ${width}`,
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
    background: theme.palette.background.default,
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
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const classes = useStyles({ width });

  const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onMenuClose = () => {
    setMenuAnchor(null);
  };

  const onSignOutClick = () => {
    dispatch(logout());
  };

  return (
    <Box id="serverPanel" className={classes.root}>
      <div className={classes.userAvatarContainer}>
        <Avatar className={classes.userAvatarButton} src="///\todoimplementimages.jpg" onClick={onMenuClick} />
        <StyledMenu open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={onMenuClose}>
          <ListItem selected={false}>Currently signed in as:</ListItem>
          <StyledMenuItem onClick={onSignOutClick}>Sign out</StyledMenuItem>
        </StyledMenu>
      </div>
      <Divider />
    </Box>
  );
};

export default memo(ServerPanel);
