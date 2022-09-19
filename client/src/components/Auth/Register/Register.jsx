import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.scss';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Register = ({ handleClick }) => {
  const { register, handleSubmit, watch, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    fetch('/api/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    })
      .then(() => navigate('/chat'))
      .then(() => reset());
  };

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
      <section className="register">
        {/* <button onClick={handleClick}>X</button> */}
        <h2>Register</h2>
        <p>
          Already a user? <a onClick={handleClick}>Sign in</a>
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
            <div className="input-wrapper">
              <input
                type="password"
                id="cPassword"
                required
                autoComplete="off"
                {...register('cPassword', {
                  validate: (val) =>
                    val === watch('password') || 'Passwords do not match',
                })}
              />
              <label htmlFor="cPassword">
                <span>Confirm Password</span>
              </label>
            </div>
            <div className="select-wrapper">
              <label htmlFor="custom-select">Select a Language:</label>
              <select
                id="custom-select"
                className="custom-select"
                defaultValue="EN-US"
                {...register('language')}
              >
                <option value="BG">Bulgarian</option>
                <option value="CS">Czech</option>
                <option value="DA">Danish</option>
                <option value="DE">German</option>
                <option value="EL">Greek</option>
                <option value="EN-GB">English (British)</option>
                <option value="EN-US">English (American)</option>
                <option value="ES">Spanish</option>
                <option value="ET">Estonian</option>
                <option value="FI">Finnish</option>
                <option value="FR">French</option>
                <option value="HU">Hungarian</option>
                <option value="ID">Indonesian</option>
                <option value="IT">Italian</option>
                <option value="JA">Japanese</option>
                <option value="LT">Lithuanian</option>
                <option value="LV">Latvian</option>
                <option value="NL">Dutch</option>
                <option value="PL">Polish</option>
                <option value="PT-BR">Portuguese (Brazilian)</option>
                <option value="PT-PT">Portuguese (Other)</option>
                <option value="RO">Romanian</option>
                <option value="RU">Russian</option>
                <option value="SK">Slovak</option>
                <option value="SL">Slovenian</option>
                <option value="SV">Swedish</option>
                <option value="TR">Turkish</option>
                <option value="UK">Ukranian</option>
                <option value="ZH">Chinese</option>
              </select>
            </div>
            <button>Register</button>
          </div>
        </form>
      </section>
    </motion.div>
  );
};

export default Register;
