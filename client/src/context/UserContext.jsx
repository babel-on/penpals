import { React, createContext, useState } from 'react';

const UserContext = createContext();

export async function UserProvider({ children }) {
  let state = await fetch('/api/')

  return <UserContext.Provider value='meme'>{children}</UserContext.Provider>;
}

export default UserContext;
