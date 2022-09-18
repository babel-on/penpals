import { React, createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({});

  const handleUser = (user) => {
    setUser(user);
  };

  // // get random userlist
  // const [userList, setUserList] = useState([]);

  // const handleUserList = async () => {
  //   // submit get request to /api/getusers to get 10 random users
  //   try {
  //     const randomUsers = await fetch(
  //       `http://localhost:3000/api/getusers?user=${user}`
  //     );
  //     setUserList(randomUsers);
  //   } catch (err) {
  //     console.log('ERROR IN getting userlist', err);
  //   }
  //   //
  // };

  // // get list of exisiting convos
  // const [convoList, setConvoList] = useState([]);

  // const handleConvoList = async () => {
  //   // submit get request to get all convos
  //   try {
  //     // not sure what the url would be, do we need to include the JWT?
  //     const allConvo = await fetch();
  //     setConvoList(allConvo);
  //   } catch (err) {
  //     console.log('ERROR IN getting convoList', err);
  //   }
  // };

  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
