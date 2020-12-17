import { ListItemText, ListItemTextProps, Typography } from '@material-ui/core';
import React from 'react';

const ListItemTextNoWrap = (props: ListItemTextProps) => {
  return <ListItemText primary={<Typography noWrap>{props?.children}</Typography>} {...props}></ListItemText>;
};

export default ListItemTextNoWrap;
