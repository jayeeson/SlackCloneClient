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
  mainPanelOpen,
  mainPanelType,
}: {
  mainPanelOpen: boolean;
  mainPanelType: MainPanelType;
  width: number;
}) => {
  const classes = useStyles();
  const display = mainPanelOpen ? 'inline' : 'none';

  const renderContent = () => {
    if (mainPanelType === MainPanelType.ChannelMessageList) {
      return (
        <Fragment>
          <MsgList />
          <MsgField />
        </Fragment>
      );
    } else if (mainPanelType === MainPanelType.DirectMessageIndex) {
      return <DirectMessageIndex />;
    }
  };

  return (
    <Box className={classes.root} id="mainPanel" display={display} flexDirection="column">
      {renderContent()}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    mainPanelOpen: state.panels.mainPanel,
    mainPanelType: state.mainPanel.openPanel,
  };
};

export default React.memo(connect(mapStateToProps)(MainPanel));
