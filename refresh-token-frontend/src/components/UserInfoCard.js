import { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { updateUser } from '../api/user'

function UserInfoCard(props) {
  const { userInfo, setUserInfo } = props;
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username || '');
  const [phone, setPhone] = useState(userInfo.phone || '');
  const [bio, setBio] = useState(userInfo.bio || '');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const updates = {
      email,
      username,
      phone,
      bio
    }
    const data = await updateUser(updates);
    setUserInfo(data);
    handleClose();
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
        <Button size="small" onClick={ handleClickOpen }>
          <EditOutlinedIcon style={{'marginRight': '4px'}}/>Edit
        </Button>
      </CardActions>
      <Dialog
        open={open}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Update your profile</DialogTitle>
        <DialogContent>
          <DialogContentText style={{'marginBottom': '1rem'}}>
            To update your profile, please fill out the boxes below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="username"
            label="User Name"
            fullWidth
            value={username}
            onInput={e => setUsername(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onInput={e => setEmail(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            value={phone}
            onInput={e => setPhone(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="bio"
            label="Bio"
            fullWidth
            multiline
            maxRows={4}
            value={bio}
            onInput={e => setBio(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default UserInfoCard;
