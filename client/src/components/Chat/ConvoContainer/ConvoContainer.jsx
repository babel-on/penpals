import React, { useContext, useEffect } from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';
import UserContext from '../../../context/UserContext';

const ConvoContainer = () => {
  const { conversation, handleConversation } = useContext(UserContext);

  // FETCH CONVERSATIONS ON INITIAL MOUNT
  useEffect(() => {
    updateMessages();
  }, []);

  // SET DRAG CLASS TO ALLOW MOVEMENT OF SIDE CONTAINERS
  const drag = 'convoContainer drag';

  // FETCH TO GRAB EVERY CONVERSATION A USER HAS ACTIVE
  const updateMessages = () => {
    fetch('/api/conversation')
      .then((res) => res.json())
      .then((data) => {
        handleConversation(
          data.map((ele) => <ConvoPreview key={ele.id} conversation={ele} />)
        );
        setTimeout(updateMessages, 3000);
      })
      .catch(() => setTimeout(updateMessages, 3000));
  };
  return (
    <div className={drag}>
      <h2>Messages</h2>
      {conversation}
    </div>
  );
};

export default ConvoContainer;
