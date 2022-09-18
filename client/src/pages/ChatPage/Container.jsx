import React, {useEffect, useState} from 'react';
import Navbar from '../../components/Chat/Navbar/Navbar.jsx';
import ChatContainer from '../../components/Chat/ChatContainer/ChatContainer.jsx';
import ConvoContainer from '../../components/Chat/ConvoContainer/ConvoContainer.jsx';
import UserContext from '../../context/UserContext';
import './Container.scss';

import io from 'socket.io-client';

const Container = () => {
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');

  useEffect(() => {
    setSocket(io('http://localhost:3030'))
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on('connect', () => {
      setSocketConnected(socket.connected);
      subscribeToDateEvent();
    });
    socket.on('disconnect', () => {
      setSocketConnected(socket.connected)
    });

    socket.on('getDate', data => {
      setDt(data);
    });

  }, [socket]);

  const handleSocketConnection = () => {
    if (socketConnected)
      socket.disconnect();
    else {
      socket.connect();
    }
  };

  const subscribeToDateEvent = (interval = 1000) => {
    socket.emit('subscribeToDateEvent', interval);
  }


  return (
    <div className='container'>
      <div className='connectedStatus'>
        <b>Connection Status:</b> {socketConnected ? 'Connected' : 'Disconnected'}
      </div>
      <input
        type="button"
        style={{ marginTop: 10 }}
        value={socketConnected ? 'Disconnect' : 'Connect'}
        onClick={handleSocketConnection} />
      <div id="message-container"></div>
      <form id="send-container">
        <input type="text" id="message-input"></input>
        <button type="submit" id="send-button">Send</button>
      </form>
      <Navbar />
      <ChatContainer />
      <ConvoContainer />
    </div>
  );

};

export default Container;
