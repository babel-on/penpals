import React, { useContext, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import UserContext from '../../../context/UserContext';

import IncomingMessages from '../../Chat/MessageBox/Messages/IncomingMessages';
import OutgoingMessages from '../../Chat/MessageBox/Messages/OutgoingMessages'

const MessageBox = () => {

  const {currentConversation, handleCurrentConversation} = useContext(UserContext);

  useEffect(() => {
    fetch('/api/conversation/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
  })

  return (
    <div className="messageBox">
      <h2>Message Box</h2>

    </div>
  );
};

export default MessageBox;
