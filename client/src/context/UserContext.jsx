import { React, createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  return <UserContext.Provider>{children}</UserContext.Provider>;
}

export default UserContext;
