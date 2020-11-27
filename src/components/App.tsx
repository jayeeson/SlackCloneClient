import React from 'react';
import AppContainer from './AppContainer';
import Panels from './PanelsFlexbox';

const App = () => {
  return (
    <React.Fragment>
      <AppContainer>
        <Panels />
      </AppContainer>
    </React.Fragment>
  );
};

export default App;
