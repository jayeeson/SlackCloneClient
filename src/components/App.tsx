import React from 'react';
import { Router, Route, Switch } from 'react-router';
import MainApp from './MainApp';
import history from '../utils/history';
import Reroute from './Reroute';
import Auth from './Auth';

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Reroute}></Route>
          <Route path="/auth" exact component={Auth}></Route>
          <Route path="/app" exact component={MainApp}></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
