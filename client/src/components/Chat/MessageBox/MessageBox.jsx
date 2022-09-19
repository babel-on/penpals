import React, { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../../../context/UserContext';
import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages';
import MessageCreator from '../MessageCreator/MessageCreator';
import './Messages/messages.scss';

const MessageBox = () => {
  const { currentConversation, user, messages, handleMessages } =
    useContext(UserContext);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    fetchCurrentConvo();
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [currentConversation]);

  const fetchCurrentConvo = () => {
    // if (!currentConversation.length) return;
    timeoutRef.current = setTimeout(fetchCurrentConvo, 3000);
    fetch(`/api/conversation/${currentConversation[0]}`)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Bad data! waiting for the next heartbeat');
        }
        return res.json();
      })
      .then((data) => {
        handleMessages((_) => []);
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
      })
      .catch((err) => null);
  };

  return (
    <div className="messageBox">
      <h2>{currentConversation[1]}</h2>
      {messages}
    </div>
  );
};

export default MessageBox;
