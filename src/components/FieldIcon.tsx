import React from 'react';
import { ChatOutlined, MoreVert, Notifications } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
  })
);

const icons: { [idx: string]: any } = {
  threads: ChatOutlined,
  mentions: Notifications,
  more: MoreVert,
};

const FieldIcon = ({ name }: { name: string }) => {
  const classes = useStyles();
  const IconComponent = icons[name.toLocaleLowerCase()];
  return IconComponent ? <IconComponent className={classes.root} /> : null;
};

export default FieldIcon;
