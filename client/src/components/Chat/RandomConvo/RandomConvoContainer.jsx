import React, { useEffect, useState } from 'react';
import RandomUser from './RandomUser/RandomUser';

const RandomConvo = () => {
  const [randomList, setRandomList] = useState([]);

  useEffect(() => {    
    fetch('/api/getusers')
      .then((res) => res.json())
      .then((data) => {
        setRandomList(
          data.map((el) => <RandomUser key={el._id} user={el} />)
        );
      })
      .then(() => console.log(randomList));
  }, []);

  

  return (
    <div className='randomList'>
      <h1>Random Users</h1>
      {randomList}
    </div>
  );

};
export default RandomConvo;
