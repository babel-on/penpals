import React from 'react';

const RandomUser = ({user}) => {
  return (
    <div className='randomUser'>
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        height="50px"
      ></img>
      <p>{user.username}</p>
      <p>{user.language}</p>
    </div>
  );
};

export default RandomUser;
