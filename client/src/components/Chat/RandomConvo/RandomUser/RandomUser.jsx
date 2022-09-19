import React, { useContext, useEffect, useState } from 'react';
import './RandomUser.scss';
import UserContext from '../../../../context/UserContext';

const RandomUser = ({user}) => {
  const { handleNewRandomConvo } = useContext(UserContext);


  return (
    <div className='randomUser' 
      onClick={() =>{
        console.log(user);
        handleNewRandomConvo(user._id);
      }}>
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        height="50px"
      ></img>
      <p className='randomUserName'>{user.username}</p>
      <p className='randomUserLang'>{user.language}</p>
    </div>
  );
};

export default RandomUser;
