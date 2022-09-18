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
      <div className="convoHeader">
        <p>{conversation.partnerLanguage}</p>
        <img
          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
          height="50px"
        ></img>
      </div>
      <div className="convoContent">
        <div className="convoInformation">
          <p className="partner">{conversation.partner}</p>
          <p>{displayTime}</p>
        </div>
        <p>{conversation.lastContent}</p>
      </div>
    </div>
  );
};

export default ConvoPreview;
