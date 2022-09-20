import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import UserContext from '../context/UserContext';
import { AnimatePresence } from 'framer-motion';
import Landing from '../pages/Landing/Landing.jsx';
import Auth from '../pages/Auth/Auth.jsx';
import Container from '../pages/ChatPage/Container';

const App = () => {
  // CONTEXT

  // USER INFORMATION
  const [user, setUser] = useState(null);
  const handleUser = (user) => {
    setUser(user);
  };

  // EVERY CONVERSATION A USER HAS
  const [conversation, setConversation] = useState([]);
  const handleConversation = (arr) => {
    setConversation(arr);
  };

  // RANDOM CONVERSATION INFORMATION
  const [randomList, setRandomList] = useState([]);
  const handleRandomList = (arr) => {
    setRandomList(arr);
  };

  // NEW RANDOM CONVERSATION INFORMATION
  const [newRandomConvo, setNewRandomConvo] = useState(null);
  const handleNewRandomConvo = (invitee) => {
    setCurrentConversation(invitee);
  };

  // CURRENT CONVERSATION ID AND PARTNER USERNAME
  const [currentConversation, setCurrentConversation] = useState([]);
  const handleCurrentConversation = (arr) => {
    setCurrentConversation(arr);
  };

  // ALL MESSAGES BETWEEN TWO PARTNERS
  const [messages, handleMessages] = useState([]);

  // EDIT MODAL CONDITIONAL STATE
  const [edit, setEdit] = useState(false);

  // EDIT CONTENT INFORMATION
  const [editContent, setEditContent] = useState(null);

  // MESSAGE ID FOR EDIT / DELETE
  const [messageID, setMessageId] = useState(0);

  // HOLDS USER INFORMATION ON SUCCESSFUL LOGIN
  useEffect(() => {
    fetch('/api/login')
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          handleUser(data);
        }
      });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
        conversation,
        handleConversation,
        currentConversation,
        handleCurrentConversation,
        randomList,
        handleRandomList,
        newRandomConvo,
        handleNewRandomConvo,
        messages,
        handleMessages,
        edit,
        setEdit,
        editContent,
        setEditContent,
        messageID,
        setMessageId,
      }}
    >
      <BrowserRouter>
        <AnimatePresence>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/chat" element={<Container />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
