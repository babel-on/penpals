import { React, createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const handleUser = (user) => {
    setUser(user);
  };

  const [conversation, setConversation] = useState([]);

  const handleConversation = (arr) => {
    setConversation(arr);
  };

  const [randomList, setRandomList] = useState([]);
  const handleRandomList = (arr) => {
    setRandomList(arr);
  };

  return (
    <UserContext.Provider
      value={{ user, handleUser, conversation, handleConversation, randomList, handleRandomList }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
