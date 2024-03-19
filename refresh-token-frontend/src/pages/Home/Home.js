import React from 'react';
import { Alert, Box, Collapse, Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

import "./Home.css"
import { getUserInfo } from '../../api/user';
import UserInfoCard from "../../components/UserInfoCard"

function Home() {
  const [open, setOpen] = React.useState(false);
  const [severityType, setSeverityType] = React.useState('success');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userInfo, setUserInfo] = React.useState(null);
  const navigate = useNavigate();

  const showAlert = (type, message) => {
    const validTypes = ['success', 'warning', 'info', 'error'];
    if (validTypes.includes(type)) {
      setSeverityType(type)
    }
    setErrorMessage(message);
    setOpen(true);
  }

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        setUserInfo(res);
      } catch (error) {
        showAlert('error', 'Failed to fetch user info');
        setTimeout(() => {
          navigate('../login')
        }, 2000)
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (!userInfo) {
    return (
      <div className="home-layout">
        <h1>Loading...</h1>
      </div>
    )
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
        <div style={{'marginLeft': '25%'}}>
          <h1>Welcome, { userInfo.username ? userInfo.username : userInfo.email }</h1>
          <h3>This is the Home page</h3>
        </div>
        <div className="user-card-layout">
          <UserInfoCard userInfo={userInfo} setUserInfo={setUserInfo}/>
        </div>
      </div>
    </>
  )
}

export default Home;
