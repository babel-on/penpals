import React from 'react';
import './messages.scss';
const OutgoingMessages = ({ message }) => {
  return (
    <div className="outgoingMessage">
      <p>{message}</p>
    </div>
  );
};

export default OutgoingMessages;
