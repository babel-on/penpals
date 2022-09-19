import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';

import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';

const MessageBox = () => {
  const { currentConversation, user } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (currentConversation === null) return;
    fetch(`/api/conversation/${currentConversation}`)
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].author === user.username) {
            setMessages((prevState) => [
              ...prevState,
              <OutgoingMessages message={data[i].content} />,
            ]);
          } else if (data[i].author !== user.username) {
            setMessages((prevState) => [
              ...prevState,
              <IncomingMessages message={data[i].content} />,
            ]);
          }
        }
      })
      .then(() => console.log(messages));
  }, [currentConversation]);

  return (
    <div className="messageBox">
      <h2>Message Box</h2>
      {messages}
    </div>
  );
};

export default MessageBox;
