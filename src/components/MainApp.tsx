import { CssBaseline, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchLoginStatus } from '../store/auth';
import { LoginStatus } from '../types';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';
import Loading from './Loading';
import { useHistory } from 'react-router';

const MainApp = ({ loginStatus }: { loginStatus: LoginStatus }) => {
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));
  const history = useHistory();
  const dispatch = useDispatch();

  // ask server if im logged in
  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus === LoginStatus.LoggedOut) {
      history.push('/auth');
    }
  }, [history, loginStatus]);

  const renderLayout = () => {
    if (loginStatus !== LoginStatus.LoggedIn) {
      return <Loading />;
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
