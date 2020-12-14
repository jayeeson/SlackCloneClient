import React, { Fragment, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Button, TextField, Paper } from '@material-ui/core';
import { RootState } from '../store';
import { connect, useDispatch } from 'react-redux';
import { login } from '../store/auth';
import { LoginStatus } from '../types';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    maxWidth: 420,
    margin: '25vh auto',
  },
  formBox: {
    backgroundColor: '#444444',
    padding: '30px 10px',
    height: '210px',
  },
  loggedInFormBox: {
    borderRadius: '0 0 5px 5px',
  },
  loggedOutFormBox: {
    borderRadius: '5px',
  },
  appBar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '5px 5px 0 0',
  },
  tabs: {
    borderRadius: 'inherit',
  },
  tab: {
    borderRadius: 'inherit',
  },
  input: {
    marginBottom: '10px',
    textAlign: 'center',
  },
  button: {
    float: 'right',
  },
  selected: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.secondary.main,
  },
}));

enum tabValues {
  login,
  register,
}

interface AuthProps {
  loginStatus: LoginStatus;
}

const Auth = ({ loginStatus }: AuthProps) => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/ban-types
  const onTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submitting login form');

    if (tab === tabValues.login) {
      dispatch(login({ username, password }));
    }
  };

  const renderLoggedOutState = () => {
    return (
      <Fragment>
        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs className={classes.tabs} value={tab} onChange={onTabChange} variant="fullWidth">
            <Tab classes={{ selected: classes.selected }} label="Login" />
            <Tab classes={{ selected: classes.selected }} className={classes.tab} label="Register" />
          </Tabs>
        </AppBar>
        <Paper className={clsx(classes.formBox, classes.loggedOutFormBox)}>
          <form onSubmit={onFormSubmit}>
            <TextField
              label="Username"
              type="username"
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className={classes.input}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={classes.input}
              fullWidth
            />
            <Button className={classes.button} type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </form>
        </Paper>
      </Fragment>
    );
  };

  const renderLoggedInState = () => {
    return (
      <Fragment>
        <Paper className={clsx(classes.formBox, classes.loggedInFormBox)}>
          <TextField
            label="Username"
            type="username"
            variant="outlined"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className={classes.input}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={classes.input}
            fullWidth
          />
          <Button className={classes.button} type="submit" color="secondary" variant="contained">
            Submit
          </Button>
        </Paper>
      </Fragment>
    );
  };

  return (
    <div className={classes.root}>
      {loginStatus === LoginStatus.LoggedOut
        ? renderLoggedOutState()
        : loginStatus === LoginStatus.LoggedIn && renderLoggedInState()}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return { loginStatus: state.auth.loginStatus };
};

export default connect(mapStateToProps)(Auth);
