import React, { useContext, useEffect, useState } from 'react';
import './RandomUser.scss';
import UserContext from '../../../../context/UserContext';

const RandomUser = ({ user }) => {
  const { newRandomConvo, handleNewRandomConvo, handleCurrentConversation } =
    useContext(UserContext);

  return (
    <div
      className="randomUser"
      onClick={() => {
        fetch('/api/conversation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invitee: user.userId }),
        })
          .then((res) => res.json())
          .then((data) =>
            handleCurrentConversation([data.id, data.partnerUsername])
          );
      }}
    >
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        height="50px"
      ></img>
      <p className="randomUserName">{user.username}</p>
      <p className="randomUserLang">{user.language}</p>
    </div>
  );
};

export default RandomUser;
