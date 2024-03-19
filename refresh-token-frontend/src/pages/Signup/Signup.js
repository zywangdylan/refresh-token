import React from 'react';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SignupForm from '../../components/SignupForm'
import "./Signup.css"

const Signup = () => {
  const [open, setOpen] = React.useState(false);
  const [severityType, setSeverityType] = React.useState('success');
  const [errorMessage, setErrorMessage] = React.useState('');

  const AlertPlaceholder = ({ visible }) => (
    <div style={{ height: visible ? '0' : '50px', transition: 'height 0.3s ease' }} />
  );

  const showAlert = (type, message) => {
    const validTypes = ['success', 'warning', 'info', 'error'];
    if (validTypes.includes(type)) {
      setSeverityType(type)
    }
    setErrorMessage(message);
    setOpen(true);
  }

  return (
    <div className="uni-form-layout">
      <Box sx={{ width: '100%' }} >
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
        <AlertPlaceholder visible={open} />
      </Box>
      <div className="signupForm">
        <SignupForm setShowAlert={showAlert}></SignupForm>
      </div>
    </div>
  );
}

export default Signup;
