import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function LoginPageNavigation() {
  return (
    <Link to="/login" className="loginPageNavigation">
      <button type="button">
        <FaUser />
        <span>Masuk</span>
      </button>
    </Link>
  );
}

export default LoginPageNavigation;
