import React, { useEffect, useState } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';
import { useFetch } from '../../../hooks/useFetch';

const ConvoContainer = () => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    fetch('/api/conversation')
      .then((res) => res.json())
      .then((data) => {
        setConversation(
          data.map((ele) => <ConvoPreview key={ele.id} conversation={ele} />)
        );
      })
      .then(() => console.log(conversation));
  }, []);

  return (
    <div className="convoContainer">
      <h1>convo container</h1>
      {conversation}
    </div>
  );
};

export default ConvoContainer;
