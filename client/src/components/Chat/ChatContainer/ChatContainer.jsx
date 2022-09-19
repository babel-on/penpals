import React from 'react';
import './ChatContainer.scss';
import MessageBox from '../MessageBox/MessageBox';
import MessageCreator from '../MessageCreator/MessageCreator';

const ChatContainer = () => {
  return (
    <div className="chatContainer">
      <h1>Chat</h1>
      <MessageBox />
      <MessageCreator />
    </div>
  );
};

export default ChatContainer;
