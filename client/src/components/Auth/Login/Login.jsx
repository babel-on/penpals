import React, {useContext} from 'react';
import UserContext from '../../../context/UserContext';
import { useForm } from 'react-hook-form';
import './Login.scss';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleClick }) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const {user, handleUser} = useContext(UserContext);
>>>>>>> 2bd61d9617c580ffd842b33364ca8d9aaf85edfd

  const onSubmit = (data) =>
    fetch('/api/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return navigate('/chat');
        else throw new Error('Invalid username or password!');
      })
      .then((data) => handleUser(data))
      .then(() => navigate('/chat'))
      .then(() => reset())
      .catch((e) => console.log(e));

  const animations = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 1 },
    exit: { opacity: 0, y: 0 },
  };
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      <div className="login">
        <section className="login-container">
          <h2>Login</h2>
          <p>
            Don&apos;t have an account?{' '}
            <a onClick={handleClick}>Become a Penpal</a>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  id="username"
                  required
                  autoComplete="off"
                  {...register('username')}
                />
                <label htmlFor="username">
                  <span>Username</span>
                </label>
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="password"
                  required
                  autoComplete="off"
                  {...register('password')}
                />
                <label htmlFor="password">
                  <span>Password</span>
                </label>
              </div>
            </div>
            <div className="checkbox-wrapper">
              <input id="rememberMe" type="checkbox" />
              <label htmlFor="rememberMe">
                <span>Remember Me</span>
              </label>
            </div>
            <button>Sign in</button>
          </form>
        </section>
      </div>
    </motion.div>
  );
};

export default Login;
