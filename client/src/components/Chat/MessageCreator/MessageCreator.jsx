import React from 'react';

<<<<<<< HEAD
const MessageCreator = () => {
=======
const MessageCreator = props => {
  // // to store new user input message in state
  // const [newMessage, setNewMessage] = useState(''); 

>>>>>>> 55d102f9c7c5d5e3f8ff69815ab10ab125f9a587
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
