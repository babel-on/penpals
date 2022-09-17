import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.scss';

const Login = ({ handleClick }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) =>
    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error('Invalid username or password!');
      })
      .then(() => reset())
      .catch((e) => console.log(e));

  return (
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
  );
};

export default Login;
