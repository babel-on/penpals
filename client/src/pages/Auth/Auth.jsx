import React from 'react';
import './Auth.scss';
import Login from '../../components/Auth/Login/Login.jsx';
import { motion } from 'framer-motion';

const Auth = () => {
  const animations = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };
  return (
    <main className="auth">
      <motion.div
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1 }}
      >
        <section className="auth-container">
          <div className="auth-content">
            <div className="auth-design">
              <div className="auth-text">
                <h2>Penpals</h2>
                <p>Babel on without fear of a language barrier.</p>
              </div>
              <img src="/chatting.png" alt="" />
            </div>
            <Login />
          </div>
        </section>
      </motion.div>
    </main>
  );
};

export default Auth;