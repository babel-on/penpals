import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';
import './Landing.scss';
import { Link } from 'react-router-dom';

const Landing2 = () => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Hello', 'Hola', 'Bonjour'],
      typeSpeed: 150,
      backSpeed: 100,
      loop: true,
    };

    typed.current = new Typed(el.current, options);
    return () => {
      typed.current.destroy();
    };
  }, []);
  return (
    <main className="landing">
      <div className="typing-wrapper">
        <span style={{ whitespace: 'pre' }} ref={el}>
          Hello
        </span>
        <span className="typed-cursor"></span>
      </div>
      <h1>
        Welcome to <span className="penpals">Penpals</span>
      </h1>
      <Link to="/auth">
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </Link>
    </main>
  );
};

export default Landing2;
