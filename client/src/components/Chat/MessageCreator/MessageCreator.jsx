import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../../../context/UserContext';

const MessageCreator = () => {

  const {conversation} = useContext(UserContext);
  // const [newMessage, setNewMessage] = useState('');

  //state needed: current conversation id, current users
  //make post request to /api/conversation/:id (conversation id)
  //req.body should have: 
  /*
      const message = {
      author: res.locals.user.username, -> should already be taken care of by jwtcontroller
      content: req.body.content, --> what we are submitting
      // we also add the message as-is as a valid translation for the user's current language
      translations: {
        [res.locals.user.language]: req.body.content,
      },
    };
  */
  //after post, doesn't have to append the new message to message box directly, but should signal to it to re-fetch conversation
  
  const handleClick = (e) => {

  }

  //needs event handler onclick for button to submit form message to route
  //after posting message to conversation should also update state of message box
  return (
    <form className="messageCreator">
      <input type="text"></input>
      {/* onchange for input field-> on change {(newValue) => setNewMessage(newValue.target.value)}? */}

      <button onClick={handleClick} className='sendButton'>Send</button>
    </form>
  );
};

export default MessageCreator;
