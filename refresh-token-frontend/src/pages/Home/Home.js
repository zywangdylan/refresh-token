import React from 'react';
import { Alert, Box, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import "./Home.css"
import UserInfoCard from "../../components/UserInfoCard"

function Home() {
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
    <>
      <Box sx={{ width: '100%' }} className="top-alert">
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
      <div className="home-layout">
        <div style={{'marginLeft': '16%'}}>
          <h1>Welcome, user123@gmail.com</h1>
          <h3>This is the Home page</h3>
        </div>
        <div className="user-card-layout">
          <UserInfoCard showAlert={showAlert}/>
        </div>
      </div>
    </>
  )
}

export default Home;
