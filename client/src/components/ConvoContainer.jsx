import React from 'react';

import ConvoPreview from './ConvoPreview';

const ConvoContainer = props => {
  //sample convo
  props.conversations = {
    1: {messages: ['0', '1']},
    2: {messages: ['1', '2']}
  };
  //note: props/state keys below are placeholders
  const conversations = [];
  for (const convo in props.conversations){
    conversations.push(
      <ConvoPreview text={convo.messages[convo.messages.length - 1]} />
    );
  }

  return (
    <div className='convoContainer'>
      {conversations}
    </div>
  );
};

export default ConvoContainer;