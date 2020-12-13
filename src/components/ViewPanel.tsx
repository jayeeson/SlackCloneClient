import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

const useStyles = makeStyles(theme => ({
  flexItem: (props: any) => ({
    height: '100%',
    width: props.viewPanelWidth,
    flex: `0 0 ${props.viewPanelWidth}`,
    padding: 0,
    margin: '0 0',
    boxSizing: 'border-box',
  }),
}));

interface IProps {
  viewPanelWidth: number;
  viewPanelOpen: boolean;
}

const ViewPanel = ({ viewPanelWidth, viewPanelOpen }: IProps) => {
  const classes = useStyles({ viewPanelWidth });
  const display = viewPanelOpen ? 'inline' : 'none';
  return (
    <Box id="viewPanel" className={classes.flexItem} display={display}>
      <Typography>Three</Typography>
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return { viewPanelOpen: state.panels.viewPanel };
};

export default React.memo(connect(mapStateToProps)(ViewPanel));
