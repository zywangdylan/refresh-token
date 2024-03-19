import * as React from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import "./form.css"

function LoginForm() {
  const navigate = useNavigate();
  return (
    <form className="form-layout">
      <h2 style={{"marginTop": "0"}}>Login</h2>
      <TextField required fullWidth label="Email"></TextField>
      <TextField required fullWidth label="Password"></TextField>
      <div style={{'width': '100%', 'display': 'flex', 'flexDirection': 'column'}}>
        <Button
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
