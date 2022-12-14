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
  const {
    messageID,
    conversation,
    setEdit,
    edit,
    editContent,
    currentConversation,
    handleMessages,
  } = useContext(UserContext);

  const onSubmit = (data) => {
    // FETCH TO CREATE A NEW MESSAGE IN A CONVERSATION
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
      body: JSON.stringify({ content: data.content, messageId: messageID }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEdit(false);
      })
      .then(() => reset());
  };

  return (
    <div>
      {edit === false && (
        <form className="messageCreator" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            autoComplete="off"
            {...register('content')}
          ></input>
          <button className="sendButton">Send</button>
        </form>
      )}
      {edit === true && (
        <form className="messageEditor" onSubmit={handleSubmit(onUpdate)}>
          <input
            type="text"
            autoComplete="off"
            {...register('content')}
            defaultValue={editContent}
          ></input>
          <button className="sendEditButton">Edit</button>
          <button
            type="button"
            onClick={() => setEdit(false)}
            className="cancelButton"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default MessageCreator;
