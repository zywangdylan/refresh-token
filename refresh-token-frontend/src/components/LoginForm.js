import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import "./form.css"
import { setAuthToken } from "../utils/localStorage";
import { login } from '../api/user'

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setShowAlert } = props
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);

      if (data.accessToken) {
        setAuthToken('accessToken', data.accessToken);
        setAuthToken('refreshToken', data.refreshToken);

        setShowAlert('success', 'Signup successful, user logged in.');
        setTimeout(() => {
          navigate('../home')
        }, 2000);
      } else {
        setShowAlert('warning', 'Signup successful, but no access token received.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setShowAlert('error', error.message || 'An error occurred during signup.');
    }
  }

  return (
    <form className="form-layout" onSubmit={handleSubmit}>
      <h2 style={{"marginTop": "0"}}>Login</h2>
      <TextField required fullWidth label="Email" value={email} onInput={e => setEmail(e.target.value)}></TextField>
      <TextField required fullWidth label="Password" value={password} onInput={e => setPassword(e.target.value)}></TextField>
      <div style={{'width': '100%', 'display': 'flex', 'flexDirection': 'column'}}>
        <Button
          type="submita"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<LoginIcon />}
          style={{"marginTop": "1rem"}}
        >
          Login
        </Button>
        <span style={{"marginTop": "8px", 'textAlign': 'center'}}>
          or&nbsp;
          <Link
            onClick={() => {
              navigate("../signup");
            }}
          >
            Signup
          </Link>
        </span>
      </div>
    </form>
  )
}

export default LoginForm;
