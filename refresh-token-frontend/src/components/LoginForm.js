import * as React from "react";
import "./form.css"
import { TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

function LoginForm() {
  return (
    <form className="form-layout">
      <h2 style={{"marginTop": "0"}}>Login</h2>
      <TextField required fullWidth label="Email"></TextField>
      <TextField required fullWidth label="Password"></TextField>
      <Button
        variant="contained"
        size="large"
        fullWidth
        startIcon={<LoginIcon />}
        style={{"margiTop": "1rem"}}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm;
