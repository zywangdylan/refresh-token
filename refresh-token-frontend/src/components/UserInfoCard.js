import * as React from "react";
import { Card, CardActions, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function UserInfoCard(props) {
  const { userInfo } = props;

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
