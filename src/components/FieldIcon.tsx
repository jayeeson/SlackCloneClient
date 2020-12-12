import React from 'react';
import { ChatOutlined, MoreVert } from '@material-ui/icons';
import { At } from 'mdi-material-ui';

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
  mentions: At,
  more: MoreVert,
};

const FieldIcon = ({ name }: { name: string }) => {
  const classes = useStyles();
  const IconComponent = icons[name.toLocaleLowerCase()];
  return IconComponent ? <IconComponent className={classes.root} /> : null;
};

export default FieldIcon;
