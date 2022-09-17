import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from '../pages/Landing/Landing.jsx';


const App = () => {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;