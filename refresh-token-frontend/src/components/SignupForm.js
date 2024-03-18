import { useState } from "react";
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { signup } from '../api/user';
import { setAuthToken } from "../api/localStorage";

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPWD, setConfirmPWD] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.table(email, password);
    // Email & Password validation

    try {
      const response = await signup(email, password);
      // Assuming the API response includes an accessToken
      if (response.accessToken) {
        setAuthToken(response.accessToken);
        setAuthToken(response.refreshToken);
        // Redirect the user or update the UI to reflect the successful signup/login
        console.log('Signup successful, user logged in.');
        
      } else {
        console.error('Signup successful, but no access token received.');
        setErrorMessage('Signup successful, but unable to log in automatically.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage(error.message || 'An error occurred during signup.');
    }
  }

  return (
    <form className="form-layout" onSubmit={handleSubmit}>
      <h2 style={{"marginTop": "0"}}>Signup</h2>
      <TextField required fullWidth label="Email" value={email} onInput={e => setEmail(e.target.value)}></TextField>
      <TextField required fullWidth label="Password" value={password} onInput={e => setPassword(e.target.value)}></TextField>
      <TextField required fullWidth label="Re-enter Password" value={confirmPWD} onInput={e => setConfirmPWD(e.target.value)}></TextField>
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
    </form>
  )
}

export default SignupForm;
