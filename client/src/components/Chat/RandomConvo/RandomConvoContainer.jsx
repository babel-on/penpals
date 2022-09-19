import React, { useEffect, useContext } from 'react';
import RandomUser from './RandomUser/RandomUser';
import UserContext from '../../../context/UserContext';

const RandomConvo = () => {
  const { randomList, handleRandomList } = useContext(UserContext);

  useEffect(() => {
    fetch('/api/getusers')
      .then((res) => res.json())
      .then((data) => {
        handleRandomList(
          data.map((el) => <RandomUser key={el._id} user={el} />)
        );
      });
  }, []);

  return (
    <div className="randomList">
      <h1>Random Users</h1>
      {randomList}
    </div>
  );
};
export default RandomConvo;
