import { useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { LoginStatus } from '../types';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';
import Loading from './Loading';
import { useHistory } from 'react-router';
import Auth from './Auth';

const MainApp = ({ loginStatus }: { loginStatus: LoginStatus }) => {
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));
  const history = useHistory();
  useEffect(() => {
    if (loginStatus === LoginStatus.LoggedOut) {
      history.push('/auth');
    }
  }, [history, loginStatus]);

  const renderLayout = () => {
    if (loginStatus === LoginStatus.Unknown) {
      return <Loading />;
    } else if (loginStatus === LoginStatus.LoggedOut) {
      return <Auth />;
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
  return { loginStatus: state.auth.loginStatus };
};

export default connect(mapStateToProps)(MainApp);
