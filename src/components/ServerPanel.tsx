import { Avatar, Box, Divider, ListItem, Menu, MenuItem, MenuProps } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

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

const StyledMenu = withStyles(theme => ({
  paper: {
    border: `1px solid ${theme.palette.divider}`,
  },
}))((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}))(MenuItem);

const ServerPanel = ({ width }: { width: number }) => {
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const classes = useStyles({ width });

  const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const onMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Box id="serverPanel" className={classes.root}>
      <div className={classes.userAvatarContainer}>
        <Avatar className={classes.userAvatarButton} src="///\todoimplementimages.jpg" onClick={onMenuClick} />
        <StyledMenu open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={onMenuClose}>
          <ListItem selected={false}>Currently signed in as:</ListItem>
          <StyledMenuItem>Sign out of Sleck</StyledMenuItem>
        </StyledMenu>
      </div>
      <Divider />
    </Box>
  );
};

export default memo(ServerPanel);
