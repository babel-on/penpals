import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { AnimatePresence } from 'framer-motion';
import Landing from '../pages/Landing/Landing.jsx';
import Auth from '../pages/Auth/Auth.jsx';
import Container from '../pages/ChatPage/Container';

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence exitBeforeEnter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" component={Container} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
