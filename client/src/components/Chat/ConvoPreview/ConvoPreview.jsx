import React from 'react';

const ConvoPreview = ({ conversation }) => {
  return (
    <div className="convoPreview">
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        height="50px"
      ></img>
      <p>{conversation.partner}</p>
      <p>{conversation.lastContent}</p>
    </div>
  );
};

export default ConvoPreview;
