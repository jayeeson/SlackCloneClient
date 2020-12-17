import React from 'react';
import { ChatOutlined, MoreVert, Add, ExpandLess, ExpandMore } from '@material-ui/icons';
import { At, Pound } from 'mdi-material-ui';

import { createStyles, makeStyles } from '@material-ui/core/styles';
import { toCamelCase } from '../utils/text';

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
  expandLess: ExpandLess,
  expandMore: ExpandMore,
  pound: Pound,
};

const FieldIcon = ({ name }: { name: string }) => {
  const classes = useStyles();
  const IconComponent = icons[toCamelCase(name)];
  return IconComponent ? <IconComponent className={classes.root} /> : null;
};

export default FieldIcon;
