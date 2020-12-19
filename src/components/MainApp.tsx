import { useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { LoginStatus } from '../types';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';
import Loading from './Loading';
import Auth from './Auth';
import { getStartupData, chatSlice } from '../store/chat';

const MainApp = ({ loginStatus, initialDataFetched }: { loginStatus: LoginStatus; initialDataFetched: boolean }) => {
  const dispatch = useAppDispatch();
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));

  useEffect(() => {
    if (loginStatus !== LoginStatus.LoggedIn) {
      dispatch(chatSlice.actions.clearFetchedData());
    }
  }, [dispatch, loginStatus]);

  const renderLayout = () => {
    if (loginStatus === LoginStatus.Unknown) {
      return <Loading />;
    } else if (loginStatus === LoginStatus.LoggedOut) {
      return <Auth />;
    }
    if (!initialDataFetched) {
      dispatch(getStartupData());
    }

    if (isDeviceXs) {
      return <PanelsSwipe />;
    }
    return <PanelsFlexbox />;
  };

  return (
    <React.Fragment>
      <SlackSocket />
      {renderLayout()}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return { loginStatus: state.auth.loginStatus, initialDataFetched: state.chat.initialDataFetched };
};

export default connect(mapStateToProps)(MainApp);
