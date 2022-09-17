import React, {useRef, useEffect} from 'react';
import './Landing.scss'; 
import Typed from 'typed.js';
import Login from '../../components/Auth/Login/Login.jsx';

const Landing = () => {

  useEffect(() => {
    document.title = 'Penpals';
  });

  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        'Hello',
        'Hola',
        'Bonjour',
      ],
      typeSpeed: 150,
      backSpeed: 100,
      loop: true
    };
    
    typed.current = new Typed(el.current, options);
    return () => {

      typed.current.destroy();
    }
  }, []);

  return (
    <div className="landing">
      <header>
        <h1>
          Penpals
        </h1>
        <div className='type-wrap'>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
          </svg><span style={{whitespace: 'pre'}} ref={el}>Hello</span>
        </div>
        <div className='p-wrapper'>
          <p>Babel on without fear of a language barrier</p>
        </div>
      </header>
      <main>
      </main>
      <img src="/chatting.png" alt="" />
    </div>
  );
};

export default Landing;
