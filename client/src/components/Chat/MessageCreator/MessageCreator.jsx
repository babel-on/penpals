import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../../context/UserContext';
import { useForm } from 'react-hook-form';
import OutgoingMessages from '../MessageBox/Messages/OutgoingMessages';
import './MessageCreator.scss';
const MessageCreator = () => {
  // const [newMessage, setNewMessage] = useState('');

  //state needed: current conversation id, current users
  //make post request to /api/conversation/:id (conversation id)
  //req.body should have:
  /*
    const message = {
      author: res.locals.user.username,
      content: req.body.content,
      // we also add the message as-is as a valid translation for the user's current language
      // translations: {
      //   [res.locals.user.language]: req.body.content,
      // },
      // ↑ disabled, because it was confusing for demonstrations
    };
  */
  //after post, doesn't have to append the new message to message box directly, but should signal to it to re-fetch conversation

  //needs event handler onclick for button to submit form message to route
  //after posting message to conversation should also update state of message box

  const { register, handleSubmit, reset } = useForm();
  const { setEdit, edit, editContent, currentConversation, handleMessages } = useContext(UserContext);

  const onSubmit = (data) => {
    console.log(currentConversation);
    fetch(`/api/conversation/${currentConversation[0]}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        handleMessages((prevState) => [
          ...prevState,
          <OutgoingMessages
            id={data.id}
            message={data.content}
            key={data.id}
          />,
        ]);
      })
      .then(() => reset());
  };

  // if edit is true, we want to submit a put request to update the content of that message 
  const onUpdate = (data) => {
    fetch(`/api/conversation/${currentConversation[0]}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then((data) => console.log(data))
      .then(() => reset());
    
  };
  
  return (
    <form className="messageCreator" onSubmit={handleSubmit(onSubmit)}>
      {edit === false && <input type="text" {...register('content')}></input>}
      {edit === false && <button className="sendButton">Send</button>}
      {edit === true && <input type="text" {...register('content')} value={editContent}></input>}
      {edit === true && <button className="sendEditButton">Send</button>}
      {edit === true && <button onClick ={()=> setEdit(false)}className="cancelButton">Cancel</button>}

    </form>
  );
};

export default MessageCreator;
