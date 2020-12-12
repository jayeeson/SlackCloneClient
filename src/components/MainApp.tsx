import { CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchLoginStatus } from '../store/auth';
import { LoginStatus } from '../types';
import PanelsFlexbox from './PanelsFlexbox';
import PanelsSwipe from './PanelsSwipe';
import SlackSocket from './SlackSocket';
import { theme } from './themes/root';
import history from '../utils/history';
import Loading from './Loading';

const MainApp = ({ loginStatus }: { loginStatus: LoginStatus }) => {
  const isDeviceXs = useMediaQuery(theme.breakpoints.only('xs'));
  const dispatch = useDispatch();

  // ask server if im logged in
  useEffect(() => {
    dispatch(fetchLoginStatus());
  }, [dispatch]);

  useEffect(() => {
    if (loginStatus === LoginStatus.LoggedIn) {
      history.push('/app');
    } else if (loginStatus === LoginStatus.LoggedOut) {
      history.push('/auth');
    }
  }, [loginStatus]);

  const renderLayout = () => {
    if (loginStatus === LoginStatus.Unknown) {
      return (
        <ThemeProvider theme={theme}>
          <Loading />
        </ThemeProvider>
      );
    }
    if (isDeviceXs) {
      return <PanelsSwipe />;
    }
    return <PanelsFlexbox />;
  };

  return (
    <React.Fragment>
      <SlackSocket />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {renderLayout()}
      </ThemeProvider>
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => {
  return { loginStatus: state.auth.loginStatus };
};

export default connect(mapStateToProps)(MainApp);
