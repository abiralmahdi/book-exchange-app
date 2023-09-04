import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './Login.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import {Link} from 'react-router-dom'




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
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
    backgroundColor:'#000'
  },
}));

export default function Login(props) {
  const classes = useStyles();


  const [usernameState, setusernameState] = useState("")
  const [passwordState, setpasswordState] = useState("")
  const cookies = new Cookies();

  function handleSubmit(e){
        axios.post(`http://127.0.0.1:8000/accounts/getAuthToken`, {
          "username":e.target[0].value,
          "password":e.target[1].value,
      })
          .then(res => {
              if (JSON.stringify(res.data) === '{"detail":"Incorrect credentials"}'){
                  alert('Incorrect credentials')
              }
              else{
                  cookies.set('username', e.target[0].value, { path: '/' });
                  cookies.set('password', e.target[1].value, { path: '/' });
                  cookies.set('token', JSON.stringify(res.data), { path: '/' });
                  
                  const request = axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUser/${e.target[0].value}`)
                  .then(
                      request =>
                      {
                      localStorage.setItem('userID', request.data.username) 
                      cookies.set('name', request.data.fname + ' ' + request.data.lname, { path: '/' });
                      props.setloggedIn(true)
                      window.location.href = '/'
                      alert(`Successfuly logged in as ${e.target[0].value}`)
                      
                  }
                  ); 

              }
          })

      
      
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
          Login
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setusernameState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setpasswordState(e.target.value)}
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className='submitButton'
          >
          Log In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup">
                Don't have an account? Sign up.
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}