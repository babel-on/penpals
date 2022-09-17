import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing.jsx';
import Container from '../components/Container.jsx';


const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path='/chat' component={Container} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;