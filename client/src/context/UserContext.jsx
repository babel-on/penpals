import { React, createContext, useState } from 'react';

const UserContext = createContext();


export function UserProvider({ children }) {

  const [user, setUser] = useState({});

  const handleUser = (user) => {
    setUser(user);
  };

  return <UserContext.Provider value={{user, handleUser}}>{children}</UserContext.Provider>;
}

export default UserContext;
