import { useState } from "react";
import { TextField, Button, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { signup } from '../api/user';
import { setAuthToken } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";

function SignupForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPWD, setConfirmPWD] = useState('');

  const navigate = useNavigate();
  const { setShowAlert } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.table(email, password);
    // Email & Password validation

    try {
      const response = await signup(email, password);

      // Assuming the API response includes an accessToken
      if (response.accessToken) {
        setAuthToken('accessToken', response.accessToken);
        setAuthToken('refreshToken', response.refreshToken);

        setShowAlert('success', 'Signup successful, user logged in.');
        navigate('../home');
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
      <h2 style={{"marginTop": "0"}}>Signup</h2>
      <TextField required fullWidth label="Email" value={email} onInput={e => setEmail(e.target.value)}></TextField>
      <TextField required fullWidth label="Password" value={password} onInput={e => setPassword(e.target.value)}></TextField>
      <TextField required fullWidth label="Re-enter Password" value={confirmPWD} onInput={e => setConfirmPWD(e.target.value)}></TextField>
      <div style={{'width': '100%', 'display': 'flex', 'flexDirection': 'column'}}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          startIcon={<LoginIcon />}
          style={{"marginTop": "1rem"}}
        >
          Signup
        </Button>
        <span style={{"marginTop": "8px", 'textAlign': 'center'}}>
          or&nbsp;
          <Link
            onClick={() => {
              navigate("../login");
            }}
          >
            Login
          </Link>
        </span>
      </div>
    </form>
  )
}

export default SignupForm;
