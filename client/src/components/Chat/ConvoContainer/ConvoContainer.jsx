import React, { useContext, useEffect } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';
import UserContext from '../../../context/UserContext';

const ConvoContainer = () => {
  const { conversation, handleConversation } = useContext(UserContext);
  useEffect(() => {
    fetch('/api/conversation')
      .then((res) => res.json())
      .then((data) => {
        handleConversation(
          data.map((ele) => <ConvoPreview key={ele.id} conversation={ele} />)
        );
      });
  }, []);

  return (
    <div className="convoContainer">
      <h1>Messages</h1>
      {conversation}
    </div>
  );
};

export default ConvoContainer;
