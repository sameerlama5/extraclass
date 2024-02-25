import { useEffect, useState } from 'react';
import { Button, Checkbox, TextField } from '@mui/material';
import { buttonStyle, textField, wrapperStyle } from './LoginStyles';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [signupMode, setSignupMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Variable set in .env', process.env.REACT_APP_APPWRITE_END_POINT);
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email) && password.length > 7) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [email, password]);
  const onLoginPressed = async () => {
    await authService
      .createSession(email, password)
      .then((data) => {
        navigate('/dashboard');
        console.log('Email login data--->', data);
      })
      .catch((err) => {
        console.log('Error occured:', err);
      });
  };
  const onSignup = async () => {
    await authService
      .createUser(email, password, name)
      .then((data) => {
        navigate('/dashboard');
        console.log('Email login data--->', data);
      })
      .catch((err) => {
        console.log('Error occured:', err);
      });
  };

  return (
    <div style={wrapperStyle}>
      <TextField
        value={email}
        style={textField}
        label={'Email'}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        type={showPassword ? 'text' : 'password'}
        value={password}
        style={textField}
        label={'Password'}
        onChange={(event) => setPassword(event.target.value)}
      />
      {signupMode && (
        <TextField
          value={name}
          style={textField}
          label={'Name'}
          onChange={(event) => setName(event.target.value)}
        />
      )}
      <div>
        Show Password
        <Checkbox
          checked={showPassword}
          onChange={(event) => setShowPassword(event.target.checked)}
        />
      </div>
      <div>
        {signupMode ? 'Already have an account? ' : 'Do not have an account? '}
        <Button variant={'text'} onClick={() => setSignupMode(!signupMode)} style={buttonStyle}>
          {signupMode ? 'Login' : 'Signup'}
        </Button>
      </div>
      <Button
        onClick={signupMode ? onSignup : onLoginPressed}
        disabled={!validated}
        style={buttonStyle}
        variant="contained">
        {signupMode ? 'Sign up' : 'Login'}
      </Button>
    </div>
  );
}

export default LoginPage;
