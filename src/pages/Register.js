import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Contents from '../components/Contents';
import RegisterForm from '../components/RegisterForm';
import useInput from '../hooks/useInput';
import { registerAccount } from '../states/authUser/action';

function Register() {
  const defaultInput = '';
  const [name, onNameChangeHandler] = useInput(defaultInput);
  const [email, onEmailChangeHandler] = useInput(defaultInput);
  const [password, onPasswordChangeHandler] = useInput(defaultInput);
  const [confirmPassword, onConfirmPasswordChangeHandler] = useInput(defaultInput);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitRegisterHandler = (event) => {
    event.preventDefault();
    if (!name || !email || !password) return toast.error('Kolom harus diisi');
    if (password !== confirmPassword) return toast.error('password salah');
    const action = registerAccount({ username: name, email, password });
    dispatch(action);
    return navigate('/login');
  };

  return (
    <Contents>
      <RegisterForm
        name={name}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onNameChangeHandler={onNameChangeHandler}
        onEmailChangeHandler={onEmailChangeHandler}
        onPasswordChangeHandler={onPasswordChangeHandler}
        onConfirmPasswordChangeHandler={onConfirmPasswordChangeHandler}
        onSubmitRegisterHandler={onSubmitRegisterHandler}
      />
    </Contents>
  );
}

export default Register;
