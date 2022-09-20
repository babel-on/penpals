import React, { useContext } from 'react';
import './ChatContainer.scss';
import MessageBox from '../MessageBox/MessageBox';
import MessageCreator from '../MessageCreator/MessageCreator';
import UserContext from '../../../context/UserContext';

const ChatContainer = () => {
  const { currentConversation } = useContext(UserContext);
  return (
    <div className="chatContainer">
      <h1>Chat</h1>
      {currentConversation[0] && <MessageBox />}
      <MessageCreator />
    </div>
  );
};

export default ChatContainer;
