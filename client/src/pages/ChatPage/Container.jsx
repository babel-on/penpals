import React from 'react';

import Navbar from '../../components/Chat/Navbar';

import ChatContainer from '../../components/Chat/ChatContainer';

import ConvoContainer from '../../components/Chat/ConvoContainer';

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