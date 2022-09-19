import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../context/UserContext';
import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';
import MessageCreator from '../MessageCreator/MessageCreator';
import './Messages/messages.scss';

const MessageBox = () => {
  const { currentConversation, user, messages, handleMessages } =
    useContext(UserContext);

  useEffect(() => {
    console.log(currentConversation);
    if (!currentConversation.length) return;
    fetch(`/api/conversation/${currentConversation[0]}`)
      .then((res) => {
        if (messages.length) handleMessages([]);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].author === user.username) {
            handleMessages((prevState) => [
              ...prevState,
              <OutgoingMessages
                id={data[i].id}
                message={data[i].content}
                key={i}
              />,
            ]);
          } else if (data[i].author !== user.username) {
            handleMessages((prevState) => [
              ...prevState,
              <IncomingMessages
                id={data[i].id}
                message={data[i].content}
                key={i}
              />,
            ]);
          }
        }
      });
  }, [currentConversation[0]]);

  return (
    <div className="messageBox">
      <h2>{currentConversation[1]}</h2>
      {messages}
    </div>
  );
};

export default MessageBox;
