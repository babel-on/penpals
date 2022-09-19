import React, { useEffect, useContext } from 'react';
import RandomUser from './RandomUser/RandomUser';
import UserContext from '../../../context/UserContext';
import './RandomConvo.scss';

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
  }, [randomList]);

  const drag = 'randomListContainer drag';

  return (
    <div className={drag}>
      <h2>Random Users</h2>
      {randomList}
    </div>
  );
};

export default RandomConvo;
