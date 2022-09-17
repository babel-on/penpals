import React from 'react';

import Navbar from './Navbar';

import ChatContainer from './ChatContainer';

import ConvoContainer from './ConvoContainer';

class Container extends React.Component {
  constructor(){
    super();
    this.state = {

    };
  }

  render(){

    return (
      <div className='container'>
        <Navbar />
        <ChatContainer />
        <ConvoContainer />
      </div>
    );
  }

}

export default Container;