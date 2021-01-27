import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { MainPanelType } from '../types';
import DirectMessageIndex from './DirectMessageIndex';
import MsgField from './MsgField';
import MsgList from './MsgList';

const useStyles = makeStyles({
  root: {
    width: '100%',
    flex: '1 0',
    margin: '0 0 0 0',
    boxSizing: 'border-box',
    display: 'flex',
    overflow: 'hidden',
  },
});

const MainPanel = ({
  msgPanelOpen,
  msgPanelType,
}: {
  msgPanelOpen: boolean;
  msgPanelType: MainPanelType;
  width: number;
}) => {
  const classes = useStyles();
  const display = msgPanelOpen ? 'inline' : 'none';

  const renderContent = () => {
    if (msgPanelType === MainPanelType.ChannelMessageList) {
      return (
        <Fragment>
          <MsgList />
          <MsgField />
        </Fragment>
      );
    } else if (msgPanelType === MainPanelType.DirectMessageIndex) {
      return <DirectMessageIndex />;
    }
  };

  return (
    <Box className={classes.root} id="msgPanel" display={display} flexDirection="column">
      {renderContent()}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    msgPanelOpen: state.panels.msgPanel,
    msgPanelType: state.msgPanel.openPanel,
  };
};

export default React.memo(connect(mapStateToProps)(MainPanel));
