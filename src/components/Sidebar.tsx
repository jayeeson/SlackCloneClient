import { Box, createStyles, Divider, Drawer, List, ListItem, ListItemIcon, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import FieldIcon from './FieldIcon';

interface IProps {
  sidebarWidth: number;
  sidebarOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    root: ({ sidebarWidth }: { sidebarWidth: number }) => ({
      width: sidebarWidth,
      background: theme.palette.background.default,
      height: '100%',
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
            <div className={classList.truncated}>{text}</div>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );

  const drawer = (
    <div className={classList.root}>
      <div className={classList.truncated}>Name of server</div>
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
