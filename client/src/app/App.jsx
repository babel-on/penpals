import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Container from '../components/Container';

const App = () => {
  return (
    <div className="router app">
      <main>
        <Switch>
          <Route
            exact
            path='/'
            component={Container}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;