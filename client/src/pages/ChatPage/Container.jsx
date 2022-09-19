import React, { useContext, useEffect } from 'react';
import Navbar from '../../components/Chat/Navbar/Navbar.jsx';
import ChatContainer from '../../components/Chat/ChatContainer/ChatContainer.jsx';
import ConvoContainer from '../../components/Chat/ConvoContainer/ConvoContainer.jsx';
import RandomConvo from '../../components/Chat/RandomConvo/RandomConvoContainer.jsx';
import UserContext from '../../context/UserContext';
import './Container.scss';
import interact from 'interactjs';

const Container = () => {
  // // individual conversations
  // const [conversation, setConversation] = useState({});
  // // get individual conversation from db
  // const handleConvo = async () => {
  //   // submit get request to get specific convos
  //   const convo = await fetch();
  //   setConversation();
  // };
  const position = { x: 0, y: 0 };
  const randomPosition = { x: 0, y: 0 };

  interact('.convoContainer').draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        position.x += event.dx;
        position.y += event.dy;

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
      },
    },
  });

  interact('.randomListContainer').draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target);
      },
      move(event) {
        randomPosition.x += event.dx;
        randomPosition.y += event.dy;

        event.target.style.transform = `translate(${randomPosition.x}px, ${randomPosition.y}px)`;
      },
    },
  });

  return (
    <div className="container">
      <Navbar />
      <ChatContainer />
      <ConvoContainer />
      <RandomConvo />
    </div>
  );
};

export default Container;
