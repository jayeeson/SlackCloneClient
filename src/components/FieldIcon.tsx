import React from 'react';
import { ChatOutlined, MoreVert, Add } from '@material-ui/icons';
import { At } from 'mdi-material-ui';

import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.text.primary,
    },
  })
);

const icons: { [idx: string]: any } = {
  threads: ChatOutlined,
  mentions: At,
  more: MoreVert,
  add: Add,
};

const FieldIcon = ({ name }: { name: string }) => {
  const classes = useStyles();
  const IconComponent = icons[name.toLocaleLowerCase()];
  return IconComponent ? <IconComponent className={classes.root} /> : null;
};

export default FieldIcon;
