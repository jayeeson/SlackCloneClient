import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MainApp from './MainApp';
import Auth from './Auth';

const App = () => {
  return (
    <React.Fragment>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={MainApp}></Route>
          <Route path="/auth" exact component={Auth}></Route>
        </Switch>
      </HashRouter>
    </React.Fragment>
  );
};

export default App;
