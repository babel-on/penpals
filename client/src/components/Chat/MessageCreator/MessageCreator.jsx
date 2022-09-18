import React from 'react';

const MessageCreator = () => {
  //needs event handler onclick for button to submit form message to route
  return (
    <form className="messageCreator">
      <input type="text"></input>
      {/* onchange for input field-> on change {(newValue) => setNewMessage(newValue.target.value)}? */}

      <button type="submit">Send</button>
    </form>
  );
};

export default MessageCreator;
