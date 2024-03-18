import React from 'react';
import { Alert, Box, Collapse, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import SignupForm from '../../components/SignupForm'
import "./Signup.css"

const Signup = () => {
  const [open, setOpen] = React.useState(true);
  const AlertPlaceholder = ({ visible }) => (
    <div style={{ height: visible ? '0' : '50px', transition: 'height 0.3s ease' }} />
  );

  return (
    <div className="uni-form-layout">
      <Box sx={{ width: '100%', display: 'fixed', top: 0}} >
        <Collapse in={open} sx={{ width: '100%' }}>
          <Alert
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
            Click the close icon to see the Collapse transition in action!
          </Alert>
        </Collapse>
        <AlertPlaceholder visible={open} />
      </Box>
      <div class="signupForm">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}

export default Signup;
