import React from 'react';
import './messages.scss';

const IncomingMessages = ({ message }) => {
  return (
    <div className="incomingMessage">
      <p>{message}</p>
    </div>
  );
};

export default IncomingMessages;
