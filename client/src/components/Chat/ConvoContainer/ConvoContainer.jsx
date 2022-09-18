import React, { useEffect, useState } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';

const ConvoContainer = () => {
  const [conversation, setConversation] = useState([]);
  useEffect(() => {
    fetch('/api/conversation')
      .then((res) => res.json())
      .then((data) => {
        setConversation(
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
