import React, { useContext, useState } from 'react';
import UserContext from '../../../../context/UserContext';
import './messages.scss';
const OutgoingMessages = ({ id, message }) => {
  const { currentConversation, handleMessages } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const handleClick = (e) => {
    setModal((prevState) => !prevState);
  };

  const handleDelete = () => {
    setModal((prevState) => !prevState);
    fetch(`/api/conversation/${currentConversation[0]}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageId: id }),
    }).then(() =>
      handleMessages((prevState) => {
        return prevState.filter((ele) => ele.props.id !== id);
      })
    );
  };

  return (
    <div className="message-container">
      {modal && (
        <div className="modal">
          <button className='editButton'>Edit</button>
          <button onClick={handleDelete} className='deleteButton' >Delete</button>
        </div>
      )}
      <div className="outgoingMessage">
        <p id={id} onClick={handleClick}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default OutgoingMessages;
