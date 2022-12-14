import React, { useContext, useState } from 'react';
import UserContext from '../../../../context/UserContext';
import './messages.scss';
const OutgoingMessages = ({ id, message }) => {
  const {
    messageID,
    setMessageId,
    edit,
    setEditContent,
    setEdit,
    currentConversation,
    handleMessages,
  } = useContext(UserContext);
  const [modal, setModal] = useState(false);

  const handleClick = (e) => {
    setModal((prevState) => !prevState);
  };

  const handleDelete = () => {
    // setModal((prevState) => !prevState);
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
          {edit === false && (
            <button
              className='editButton'
              onClick={() => {
                console.log('ID is', id);
                setMessageId(id);
                setEdit(true);
                setEditContent(`${message}`);
                console.log('MESSAGE ID IS ', messageID);
              }}
            >
              Edit
            </button>
          )}
          {edit === false && <button className='deleteButton' onClick={handleDelete}>Delete</button>}
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
