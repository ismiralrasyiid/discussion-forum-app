import React from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RegisterForm({
  name,
  email,
  password,
  confirmPassword,
  onNameChangeHandler,
  onEmailChangeHandler,
  onPasswordChangeHandler,
  onConfirmPasswordChangeHandler,
  onSubmitRegisterHandler,
}) {
  return (
    <main className="loginRegister">
      <h2>Daftar akun</h2>
      <form onSubmit={onSubmitRegisterHandler}>
        <label htmlFor="registerName"><FaUser /></label>
        <input
          id="registerName"
          name="registerName"
          type="input"
          placeholder="Nama"
          value={name}
          onChange={onNameChangeHandler}
        />
        <label htmlFor="registerEmail"><FaEnvelope /></label>
        <input
          id="registerEmail"
          name="registerEmail"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChangeHandler}
        />
        <label htmlFor="registerPassword"><FaLock /></label>
        <input
          id="registerPassword"
          name="registerPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChangeHandler}
        />
        <label htmlFor="registerConfirmPassword"><FaLock /></label>
        <input
          id="registerConfirmPassword"
          name="registerConfirmPassword"
          type="password"
          placeholder="Konfirmasi Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChangeHandler}
        />
        <button type="submit">Daftar</button>
        <p>
          Sudah punya akun?&nbsp;
          <Link to="/login">Masuk di sini</Link>
          .
        </p>
      </form>
    </main>
  );
}

RegisterForm.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  onNameChangeHandler: PropTypes.func.isRequired,
  onEmailChangeHandler: PropTypes.func.isRequired,
  onPasswordChangeHandler: PropTypes.func.isRequired,
  onConfirmPasswordChangeHandler: PropTypes.func.isRequired,
  onSubmitRegisterHandler: PropTypes.func.isRequired,
};

export default RegisterForm;
