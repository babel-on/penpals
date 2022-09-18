import React from 'react';
import Navbar from '../../components/Chat/Navbar/Navbar.jsx';
import ChatContainer from '../../components/Chat/ChatContainer/ChatContainer.jsx';
import ConvoContainer from '../../components/Chat/ConvoContainer/ConvoContainer.jsx';
import UserContext from '../../context/UserContext';

class Container extends React.Component {
  constructor(props){
    super(props);
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