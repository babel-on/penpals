import React from 'react';
import { useForm } from 'react-hook-form';
import './Register.scss';
import { motion } from 'framer-motion';

const Register = () => {
  const { register, handleSubmit, watch, reset } = useForm();

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
        <button>X</button>
        <h2>Register</h2>
        <form>
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
            <button>Register</button>
          </div>
        </form>
      </section>
    </motion.div>
  );
};

export default Register;
