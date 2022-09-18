import React from 'react';
import './ConvoPreview.scss';

const ConvoPreview = ({ conversation }) => {
  const time = new Date(conversation.lastTime);
  const displayTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className="convoPreview">
      <img
        src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
        height="50px"
      ></img>
      <p>{conversation.partner}</p>
      <p>{conversation.partnerLanguage}</p>
      <p>{conversation.lastContent}</p>
      <p>{displayTime}</p>
    </div>
  );
};

export default ConvoPreview;
