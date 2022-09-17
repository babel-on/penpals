import React from 'react';

import Navbar from '../../components/Chat/Navbar';

import ChatContainer from '../../components/Chat/ChatContainer';

import ConvoContainer from '../../components/Chat/ConvoContainer';
import UserContext from '../../context/UserContext';

class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){

    return (
      <div>
        <UserContext.Consumer>
          {value => <h1>{value}</h1>}
        </UserContext.Consumer>
        <div className='container'>
          <Navbar />
          <ChatContainer />
          <ConvoContainer />
        </div>
      </div>
    );
  }

}

export default Container;