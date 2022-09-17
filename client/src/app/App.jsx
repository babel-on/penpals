import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Container from '../components/Container';

const App = () => {
  return (
    <div className="router app">
      <main>
        <Router>

          <Routes>
            <Route path='/chat' component={Container} />
          </Routes>

        </Router>
      </main>
    </div>
  );
};

export default App;