import { Avatar, Box, Divider, Button, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import React, { Fragment, memo, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { logout } from '../store/auth';
import ServerList from './ServerList';
import StyledMenu from './subcomponents/StyledMenu';
import StyledMenuItem from './subcomponents/StyledMenuItem';
import AddServerMenu from './AddServerMenu';

interface useStylesProps {
  width: number;
  addServerButtonHeight: number;
}
const useStyles = makeStyles(theme => ({
  root: ({ width }: useStylesProps) => ({
    height: '100%',
    width: width,
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
    background: theme.palette.background.default,
  }),
  userAvatarContainer: ({ width }: useStylesProps) => ({
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
  addServerButton: ({ addServerButtonHeight }: useStylesProps) => ({
    position: 'relative',
    transform: 'translateX(-50%)',
    left: '50%',
    cs: 'center',
    width: `${addServerButtonHeight}px`,
    minWidth: `${addServerButtonHeight}px`,
    height: `${addServerButtonHeight}px`,
  }),
}));

const ServerPanel = ({ width, username }: { width: number; username?: string }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [addServerMenuOpen, setAddServerMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const addServerButtonHeight = 24;
  const classes = useStyles({ width, addServerButtonHeight });

  const onProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setProfileMenuOpen(true);
  };

  const onProfileMenuClose = () => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
  };

  const onSignOutClick = () => {
    dispatch(logout());
  };

  const renderAddServerButton = () => {
    return (
      <Fragment>
        <Button className={classes.addServerButton} onClick={() => setAddServerMenuOpen(true)}>
          <Add />
        </Button>
        <AddServerMenu addServerMenuOpen={addServerMenuOpen} setAddServerMenuOpen={setAddServerMenuOpen} />
      </Fragment>
    );
  };

  return (
    <Box id="serverPanel" className={classes.root}>
      <div className={classes.userAvatarContainer}>
        <Avatar className={classes.userAvatarButton} src="///\todoimplementimages.jpg" onClick={onProfileMenuClick} />
        <StyledMenu open={profileMenuOpen} anchorEl={anchorEl} onClose={onProfileMenuClose}>
          <ListItem selected={false}>
            <Typography>{`Currently signed in as: ${username}`}</Typography>
          </ListItem>
          <StyledMenuItem onClick={onSignOutClick}>Sign out</StyledMenuItem>
        </StyledMenu>
      </div>
      <Divider />
      <div id="test1234">
        <ServerList width={width} addServerButtonHeight={addServerButtonHeight} />
        {renderAddServerButton()}
      </div>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return { username: Object.values(state.chat.users).find(user => user.id === state.chat.userId)?.username };
};

export default memo(connect(mapStateToProps)(ServerPanel));
