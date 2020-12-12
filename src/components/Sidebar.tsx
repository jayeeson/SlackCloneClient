import { Box, createStyles, Divider, List, ListItem, ListItemIcon, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import FieldIcon from './FieldIcon';
import { channelSlice } from '../store/channel';
import { sidebarTheme } from './themes/sidebar';

interface IProps {
  sidebarWidth: number;
  sidebarOpen: boolean;
  activeChannelId: number;
  setActiveChannelId: typeof channelSlice.actions.setActiveChannelId;
}

const useStyles = makeStyles(theme =>
  createStyles({
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
    serverNameContainer: {
      height: '60px',
      verticalAlign: 'middle',
    },
    serverNameContent: {
      marginLeft: 18,
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },
    channellistItem: {},
  })
);

const Sidebar = ({ sidebarWidth, sidebarOpen, activeChannelId, setActiveChannelId }: IProps) => {
  const classList = useStyles({ sidebarWidth });
  const listItems = {
    general: [
      { text: 'Threads', channel: 1 },
      { text: 'Mentions', channel: 2 },
      { text: 'More', channel: 3 },
    ],
  };

  const onListItemClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: { text: string; channel: number }
  ) => {
    if (item.channel && activeChannelId !== item.channel) {
      setActiveChannelId({ channelId: item.channel });
    }
  };

  const renderList = (list: { text: string; channel: number }[]) => (
    <List>
      {list.map(item => (
        <ListItem
          button
          disableRipple
          key={item.text}
          className={classList.truncated}
          selected={activeChannelId === item.channel}
          onClick={e => onListItemClick(e, item)}
        >
          <ListItemIcon>
            <FieldIcon name={item.text} />
            <Typography className={clsx(classList.truncated)}>{item.text}</Typography>
          </ListItemIcon>
        </ListItem>
      ))}
    </List>
  );

  const sidebarContent = (
    <div className={classList.root}>
      <div className={classList.serverNameContainer}>
        <Typography className={clsx(classList.truncated, classList.serverNameContent)}>Name of server</Typography>
      </div>
      <Divider />
      {renderList(listItems.general)}
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
      {sidebarContent}
    </Box>
  );
};

const mapDispatchToProps = {
  setActiveChannelId: channelSlice.actions.setActiveChannelId,
};

const mapStateToProps = (state: RootState) => {
  return { sidebarOpen: state.panels.sidebar, activeChannelId: state.channel.activeChannelId };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
