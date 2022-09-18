import React from 'react';
import Navbar from '../../components/Chat/Navbar/Navbar.jsx';
import ChatContainer from '../../components/Chat/ChatContainer/ChatContainer.jsx';
import ConvoContainer from '../../components/Chat/ConvoContainer/ConvoContainer.jsx';
import UserContext from '../../context/UserContext';
import { useFetch } from '../../hooks/useFetch.js';
import './Container.scss';

const Container = () => {
  const [currentConversations, loadingCurrentConversations] =
    useFetch('/api/conversation');
  // // individual conversations
  // const [conversation, setConversation] = useState({});
  // // get individual conversation from db
  // const handleConvo = async () => {
  //   // submit get request to get specific convos
  //   const convo = await fetch();
  //   setConversation();
  // };
  return (
    <div className="container">
      <Navbar />
      <ChatContainer />
      <ConvoContainer />
    </div>
  );
};

export default Container;
