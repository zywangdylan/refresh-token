import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActions, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getUserInfo } from "../api/user";

function UserInfoCard(props) {
  const [userInfo, setUserInfo] = React.useState(null);
  const { showAlert } = props;
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        console.log(res)
        setUserInfo(res);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        showAlert('error', 'Failed to fetch user info');
        navigate('../login')
      }
    };

    fetchUserInfo();
  }, [navigate, showAlert]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ minWidth: 300, maxWidth: 400 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Basic User Info
        </Typography>
        <Typography variant="body2" color="text.secondary">
          { userInfo.bio || "This user doesn't have any bio yet" }
        </Typography>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem
            disableGutters
          >
            <ListItemText primary={`User name`} />
            <ListItemText primary={userInfo.username || 'No user name yet'} className={`right ${userInfo.username? '': 'grey'}`}/>
          </ListItem>
          <ListItem
            disableGutters
          >
            <ListItemText primary={`Email`} />
            <ListItemText primary={userInfo.email} className='right'/>
          </ListItem>
          <ListItem
            disableGutters
          >
            <ListItemText primary={`Phone`} />
            <ListItemText primary={userInfo.phone || 'No phone number yet'} className={`right ${userInfo.phone? '': 'grey'}`}/>
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <Button size="small">
          <EditOutlinedIcon style={{'marginRight': '4px'}}/>Edit
        </Button>
      </CardActions>
    </Card>
  )
}

export default UserInfoCard;
