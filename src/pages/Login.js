import React from 'react';
import { useDispatch } from 'react-redux';
import Contents from '../components/Contents';
import LoginForm from '../components/LoginForm';
import useInput from '../hooks/useInput';
import { fetchAuthUser } from '../states/authUser/action';

function Login() {
  const defaultInput = '';
  const [email, onEmailChangeHandler] = useInput(defaultInput);
  const [password, onPasswordChangeHandler] = useInput(defaultInput);
  const dispatch = useDispatch();

  const onSubmitLoginHandler = (event) => {
    event.preventDefault();
    const action = fetchAuthUser({ email, password });
    dispatch(action);
  };

  return (
    <Contents>
      <LoginForm
        email={email}
        password={password}
        onEmailChangeHandler={onEmailChangeHandler}
        onPasswordChangeHandler={onPasswordChangeHandler}
        onSubmitLoginHandler={onSubmitLoginHandler}
      />
    </Contents>
  );
}

export default Login;
