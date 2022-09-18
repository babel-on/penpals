import React, { useContext, useEffect } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';
<<<<<<< HEAD
<<<<<<< HEAD
import RandomConvo from '../RandomConvo/RandomConvoContainer';
import { useFetch } from '../../../hooks/useFetch';
=======
>>>>>>> jigar
=======
import UserContext from '../../../context/UserContext';
>>>>>>> jigar

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
      <RandomConvo /> 
    </div>
  );
};

export default ConvoContainer;
