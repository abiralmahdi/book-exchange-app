import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../Accounts/Login.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Alert from '@material-ui/lab/Alert';

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
  
  export default function ChangePassword(props) {
    const classes = useStyles();
  
  
    const [oldPassState, setoldPassState] = useState('')
    const [newPassState, setnewPassState] = useState('')
    const [confirmPassState, setconfirmPassState] = useState('')

    const cookies = new Cookies();
  
    function handleSubmit(e){

        if (e.target[1].value === e.target[2].value){

            axios.post(`http://127.0.0.1:8000/accounts/changePassword/${localStorage.getItem('userID')}`, {
                "oldPass":e.target[0].value,
                "newPass":e.target[1].value,
                'confirmPass': e.target[2].value
            })
                .then(res => {
                    if (res.data === 200){
                        cookies.remove('username', { path: '/' })
                        cookies.remove('password', { path: '/' });
                        cookies.remove('token', { path: '/' });
                        cookies.set('name', 'Not Logged in', { path: '/' });
                        props.setloggedIn(false)
                        window.location.href = '/login'
                        alert('Successfully Changed password. Please Log In Again')
                    }
                    else if (res.data === 401){
                       alert('Incorrect Password')
                    }
                })    
        }
        else{
            alert('Your Passwords does not match')
        }
        e.preventDefault()
    }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Alert icon={false} severity="success">
          <Typography component="h1" variant="h5" className='font-weight-bold'>
            Change Password
          </Typography>
            </Alert>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="oldPass"
                  label="Old Password"
                  name="oldPass"
                  type="password"
                  autoComplete="password"
                  onChange={(e) => setoldPassState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="newPass"
                  label="New Password"
                  type="password"
                  id="newPass"
                  autoComplete="current-password"
                  onChange={(e) => setnewPassState(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cPass"
                  label="Confirm Password"
                  type="password"
                  id="cPass"
                  autoComplete="current-password"
                  onChange={(e) => setconfirmPassState(e.target.value)}
                />
              </Grid>
  
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='submitButton'
            >
            Change Password
            </Button>

          </form>
        </div>
      </Container>
    );
  }
