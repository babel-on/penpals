import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';
import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';

const MessageBox = () => {
  const { currentConversation, user, messages, handleMessages } =
    useContext(UserContext);

  useEffect(() => {
    if (currentConversation === null) return;
    fetch(`/api/conversation/${currentConversation}`)
      .then((res) => {
        handleMessages([]);
        return res.json();
      })

      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].author === user.username) {
            handleMessages((prevState) => [
              ...prevState,
              <OutgoingMessages message={data[i].content} key={i} />,
            ]);
          } else if (data[i].author !== user.username) {
            handleMessages((prevState) => [
              ...prevState,
              <IncomingMessages message={data[i].content} key={i} />,
            ]);
          }
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
