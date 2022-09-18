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

  return (
    <UserContext.Provider
      value={{ user, handleUser, conversation, handleConversation }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
