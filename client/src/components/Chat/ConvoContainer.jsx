import React from 'react';

import ConvoPreview from './ConvoPreview';

const ConvoContainer = props => {

  return (
    <div className='convoContainer'>
      <h1>convo container</h1>
      <ConvoPreview />
      <ConvoPreview />
    </div>
  );
};

export default ConvoContainer;