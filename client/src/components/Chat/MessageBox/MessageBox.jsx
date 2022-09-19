import React, { useContext, useEffect } from 'react';
import UserContext from '../../../context/UserContext';

import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';

const MessageBox = () => {
  const { currentConversation, user } = useContext(UserContext);
  const messages = [];

  useEffect(() => {
    console.log(currentConversation);
    fetch(`/api/conversation/${currentConversation}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data[0].author === user) {
          messages.push(<OutgoingMessages message={data[0].content} />);
        } else if (data[0].author !== user) {
          messages.push(<IncomingMessages message={data[0].content} />);
        }
      });
  }, [currentConversation]);

  return (
    <div className="messageBox">
      <h2>Message Box</h2>
      {messages}
    </div>
  );
};

export default MessageBox;
