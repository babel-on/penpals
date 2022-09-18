import React, { useContext, useEffect } from 'react';
import UserContext from '../../../context/UserContext';

import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';

const MessageBox = () => {

  const {currentConversation, user} = useContext(UserContext);
  const messages = [];
  useEffect(() => {
    fetch(`/api/conversation/${currentConversation}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });

  /*
          for (const message of data){
          if (message.author === user){
            messages.push(<OutgoingMessages message={message.content} />);
          } else if (message.author !== user){
            messages.push(<IncomingMessages message={message.content} />);
          }
        }
  */

  return (
    <div className="messageBox">
      <h2>Message Box</h2>
      {messages}
    </div>
  );
};

export default MessageBox;
