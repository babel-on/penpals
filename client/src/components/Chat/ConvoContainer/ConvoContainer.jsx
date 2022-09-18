import React from 'react';
import './ConvoContainer.scss';
import ConvoPreview from '../ConvoPreview/ConvoPreview';

const ConvoContainer = () => {
  return (
    <div className="convoContainer">
      <h1>convo container</h1>
      <ConvoPreview />
      <ConvoPreview />
    </div>
  );
};

export default ConvoContainer;
