import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();


  const [usernameState, setusernameState] = useState("")
  const [passwordState, setpasswordState] = useState("")
  const [fnameState, setfnameState] = useState("")
  const [cpasswordState, setcpasswordState] = useState("")
  const [lnameState, setlnameState] = useState("")
  const [contactState, setcontactState] = useState("")
  const [genreState, setgenreState] = useState("")

  function handleSubmit(e){
      if (e.target[4].value === e.target[5].value){
          axios.post(`http://127.0.0.1:8000/accounts/register`, {
              "first_name" : e.target[0].value,
              "last_name" : e.target[1].value,
              "username" : e.target[2].value,
              "password" : e.target[5].value,
              "email" : e.target[2].value,
              "contact": e.target[3].value,
              "address":e.target[4].value
          })
          .then(res => {
              alert('Created account successfully! Please go to the Log in page to login to your account')
              window.location.href = '/'
          })
      }
      else{
          alert('Passwords doesnot match')
      }
        
      e.preventDefault()
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => setfnameState(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                 onChange={(e) => setlnameState(e.target.value)}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 onChange={(e) => setusernameState(e.target.value)}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => setcontactState(e.target.value)}
                required
                fullWidth
                id="contact"
                label="Contact"
                name="contact"
                type="number"
                autoComplete="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 onChange={(e) => setpasswordState(e.target.value)}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 onChange={(e) => setcpasswordState(e.target.value)}
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} style={{display:'flex'}}>
              <TextField
               onChange={(e) => setgenreState(e.target.value)}
                required
                fullWidth
                id="genres"
                label="Favourite Genres"
                name="genres"
                autoComplete="genre"
              />
              <Button size='small' style={{borderRadius:'20px', marginTop:'15px'}}>
                <AddIcon/>
              </Button>
              
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className='submitButton'
          >
          Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/login'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}