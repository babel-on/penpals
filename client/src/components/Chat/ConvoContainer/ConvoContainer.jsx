import React, { useContext, useEffect } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';
import UserContext from '../../../context/UserContext';

const ConvoContainer = () => {
  const { conversation, handleConversation } = useContext(UserContext);
  useEffect(() => {
    updateMessages();
  }, []);

  const drag = 'convoContainer drag';
  const updateMessages = () => {
    fetch('/api/conversation')
      .then((res) => res.json())
      .then((data) => {
        handleConversation(
          data.map((ele) => <ConvoPreview key={ele.id} conversation={ele} />)
        );
        setInterval(updateMessages, 3000);
      });
  };
  return (
    <div className={drag}>
      <h2>Messages</h2>
      {conversation}
    </div>
  );
};

export default ConvoContainer;
