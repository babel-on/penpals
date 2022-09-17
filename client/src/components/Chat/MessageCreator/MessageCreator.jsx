import React from 'react';

const MessageCreator = props => {
  //needs event handler onclick for button to submit form message to route
  return (
    <form className='messageCreator'>
      <input type='text'></input>
      <button type='submit'>Send</button>
    </form>
  );
};

export default MessageCreator;