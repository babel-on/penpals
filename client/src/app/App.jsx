import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import UserContext from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import Landing from '../pages/Landing/Landing.jsx';
import Auth from '../pages/Auth/Auth.jsx';
import Container from '../pages/ChatPage/Container';

const App = () => {
  const [user, setUser] = useState(null);
  const handleUser = (user) => {
    setUser(user);
  };

  const [conversation, setConversation] = useState([]);
  const handleConversation = (arr) => {
    setConversation(arr);
  };

  const [randomList, setRandomList] = useState([]);
  const handleRandomList = (arr) => {
    setRandomList(arr);
  };

  const [currentConversation, setCurrentConversation] = useState(null);
  const handleCurrentConversation = (id) => {
    setCurrentConversation(id);
  };

  useEffect(
    fetch('/api/login')
      .then((res) => res.json())
      .then((data) => {
        console.log('JSON: ' + data);
        if (data.username) {
          console.log(data.username);
          handleUser(data);
        }
      }, [])
  );
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Container />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
};

export default App;
