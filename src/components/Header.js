import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../states/authUser/action';

function Header() {
  const LOGIN_PAGE_ROUTE = '/login';
  const { authUser } = useSelector((states) => states);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const action = logout();
    dispatch(action);
    navigate(LOGIN_PAGE_ROUTE);
  };

  return (
    <header>
      <h1>
        <Link to="/">Forum Diskusi React</Link>
      </h1>
      {authUser
        ? (
          <nav>
            <img src={authUser.avatar} alt="avatar" />
            <span>{authUser.name}</span>
            <button type="button" onClick={logoutHandler}>Logout</button>
          </nav>
        ) : null}
    </header>
  );
}

export default Header;
