import React from 'react';

const OutgoingMessages = ({message}) => {
  return (
    <div className='outgoingMessage'>
      <p>{message}</p>
    </div>
  );
};

export default OutgoingMessages;
