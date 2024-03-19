import React from 'react';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import LoginForm from '../../components/LoginForm'
import "./Login.css"

function Login() {
  const [open, setOpen] = React.useState(false);
  const [severityType, setSeverityType] = React.useState('success');
  const [errorMessage, setErrorMessage] = React.useState('');

  const showAlert = (type, message) => {
    const validTypes = ['success', 'warning', 'info', 'error'];
    if (validTypes.includes(type)) {
      setSeverityType(type)
    }
    setErrorMessage(message);
    setOpen(true);
  }

  return (
    <div className="login-layout">
      <Box sx={{ width: '100%', position: 'fixed', top: 0 }} >
        <Collapse in={open} sx={{ width: '100%' }}>
          <Alert
            severity={severityType}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
            style={{ margin: 0 }}
          >
            { errorMessage }
          </Alert>
        </Collapse>
      </Box>
      <LoginForm setShowAlert={showAlert}></LoginForm>
    </div>
  )
}

export default Login;
