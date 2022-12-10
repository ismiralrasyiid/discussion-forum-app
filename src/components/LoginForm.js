import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LoginForm({
  email,
  password,
  onEmailChangeHandler,
  onPasswordChangeHandler,
  onSubmitLoginHandler,
}) {
  return (
    <main className="loginRegister">
      <h2>Masuk untuk lanjut</h2>
      <form onSubmit={onSubmitLoginHandler}>
        <label htmlFor="loginEmail"><FaEnvelope /></label>
        <input
          id="loginEmail"
          name="loginEmail"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
        />
        <label htmlFor="loginPassword"><FaLock /></label>
        <input
          id="loginPassword"
          name="loginPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChangeHandler}
        />
        <button type="submit">Masuk</button>
        <p>
          Belum punya akun?&nbsp;
          <Link to="/register">Daftar di sini</Link>
          .
        </p>
      </form>
    </main>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChangeHandler: PropTypes.func.isRequired,
  onPasswordChangeHandler: PropTypes.func.isRequired,
  onSubmitLoginHandler: PropTypes.func.isRequired,
};

export default LoginForm;
