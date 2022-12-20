import React from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BottomNavButton } from './styled/buttons';

function LoginPageNavigation() {
  return (
    <Link to="/login" className="loginPageNavigation">
      <BottomNavButton type="button">
        <FaUser />
        <span>Masuk</span>
      </BottomNavButton>
    </Link>
  );
}

export default LoginPageNavigation;
