import { Box, createStyles, Divider, List, ListItem, ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import FieldIcon from './FieldIcon';

interface IProps {
  sidebarWidth: number;
  sidebarOpen: boolean;
}

const useStyles = makeStyles(theme =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    root: ({ sidebarWidth }: { sidebarWidth: number }) => ({
      width: sidebarWidth,
      background: theme.palette.background.default,
      height: '100%',
      boxSizing: 'border-box',
      borderRight: `1px solid ${theme.palette.divider}`,
    }),
    truncated: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen }: IProps) => {
  const classList = useStyles({ sidebarWidth });
  const contentText = {
    general: ['Threads', 'Mentions', 'More'],
  };

  const renderList = (list: string[]) => (
    <List>
      {list.map(text => (
        <ListItem button key={text} className={classList.truncated}>
          <ListItemIcon>
            <FieldIcon name={text} />
            <Typography className={classList.truncated}>{text}</Typography>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );

  const drawer = (
    <div className={classList.root}>
      <Typography className={classList.truncated}>Name of server</Typography>
      <Divider />
      {renderList(contentText.general)}
    </div>
  );

  return (
    <Box
      height="100%"
      flexGrow={0}
      flexShrink={0}
      flexBasis={sidebarWidth}
      width={sidebarWidth}
      id="sidebar"
      display={sidebarOpen ? 'inline' : 'none'}
    >
      {drawer}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return { sidebarOpen: state.panels.sidebar };
};

export default React.memo(connect(mapStateToProps)(Sidebar));
