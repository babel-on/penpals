import React from 'react';

import MessageBox from './MessageBox';
import MessageCreator from './MessageCreator';

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