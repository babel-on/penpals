import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { UserProvider } from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import Landing from '../pages/Landing/Landing.jsx';
import Auth from '../pages/Auth/Auth.jsx';
import Container from '../pages/ChatPage/Container';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AnimatePresence exitBeforeEnter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={<Container />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
