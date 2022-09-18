import React from 'react';

const IncomingMessages = ({message}) => {
  return (
    <div className='incomingMessage'>
      <p>{message}</p>
    </div>
  );
};

export default IncomingMessages;
