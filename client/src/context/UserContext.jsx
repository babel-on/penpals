import { React, createContext, useState } from 'react';

const UserContext = createContext();

const [user, setUser] = useState();

export function UserProvider({ children }) {
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
}

export default UserContext;
