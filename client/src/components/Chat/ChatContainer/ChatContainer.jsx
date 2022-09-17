import React from 'react';
import './ChatContainer.scss';
import MessageBox from '../MessageBox/MessageBox';
import MessageCreator from '../MessageCreator/MessageCreator';

const ChatContainer = props => {
  return (
    <div className='chatContainer'>
      <h1>ChatContainer</h1>
      <MessageBox />
      <MessageCreator />
    </div>
  );
};

export default ChatContainer;