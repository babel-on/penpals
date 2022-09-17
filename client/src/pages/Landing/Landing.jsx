import React, {useRef, useEffect} from 'react';
import './Landing.scss'; 
import Typed from 'typed.js';

const Landing = () => {

  const el = useRef(null);
  const typed = useRef(null)

  useEffect(() => {
    const options = {
      strings: [
        'Hello',
        'Hola',
        'Bonjour',
        '你好',
        'こんにちは',
        'नमस्ते',
        'привет',
        'здраво таму'
      ],
      typeSpeed: 150,
      backSpeed: 75,
      loop: true
    }
    typed.current = new Typed(el.current, options);
    return () => {

      typed.current.destroy();
    }
  }, [])

  return (
    <div className="landing">
      <div className='typing'>
        <h1 style={{whitespace: 'pre'}} ref={el}>Hello</h1>
      </div>
      <h2>Click to continue</h2>
    </div>
  );
};

export default Landing;
