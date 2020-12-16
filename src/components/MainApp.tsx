import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { LoginStatus } from '../types';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';
import Loading from './Loading';
import Auth from './Auth';
import { fetchInitialData } from '../store/chat';

const MainApp = ({ loginStatus, initialDataFetched }: { loginStatus: LoginStatus; initialDataFetched: boolean }) => {
  const dispatch = useAppDispatch();
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));

  const renderLayout = () => {
    if (loginStatus === LoginStatus.Unknown) {
      return <Loading />;
    } else if (loginStatus === LoginStatus.LoggedOut) {
      return <Auth />;
    }
    if (!initialDataFetched) {
      dispatch(fetchInitialData());
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
