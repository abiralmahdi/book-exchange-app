import React from 'react'
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './DeactivateAlert.css'
import Cookies from 'universal-cookie'
import axios from 'axios'

function DeactivateAlert(props) {

    const cookies = new Cookies

    const [passswordState, setpassswordState] = React.useState()

    function handleSubmit(e){
        if (e.target[0].value === cookies.get('password', {path:'/'})){
            let proceed = window.confirm("Are you sure you want to proceed?");

            if (proceed){
                axios.post(`http://127.0.0.1:8000/accounts/deactivateID/${cookies.get('username', {path:'/'})}`)
                .then(
                    res => {
                        if (res.data.status === 'Deactivated'){
                            alert('Successfully deactivated your ID')
                            cookies.remove('username', {path:'/'})
                            cookies.remove('password', {path:'/'})
                            cookies.set('name', 'Not Logged In', {path:'/'})
                            props.setloggedIn(false)
                            window.location.href = '/login'
                        }
                        else{
                            alert('There is some issue with the server. Please try again later. Or contact us in case of emergency.')
                        }
                    }
                )
            }
            else{

            }
        }
        else{
            alert('Incorrect Password')
        }
        e.preventDefault()
    }

    return (
        <div className='mt-5 pt-5 container'>
           <Alert severity="error" variant="filled" >Account Deletion</Alert> 
           <Alert icon={false} severity="error">
                You are about to delete your account. Once you delete your account, it can never be returned. We highly encourage you to contact us before taking such a drastic step. We might help solving your issues if you're facing any problems on our platform.
                <form className='deactivationForm' onSubmit={handleSubmit}>
 
              
                    <Grid item xs={12}>
                        <TextField
                        required
                        
                        id="pass"
                        label="Enter password to continue"
                        name="pass"
                        type="password"
                        autoComplete="password"
                        style={{margin: '20px', width: '90%'}}
                        onChange={(e) => setpassswordState(e.target.value)}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        id='deactivationConfirmation'
                        >
                        Delete Account
                    </Button>

                </form>
            </Alert>

        </div>
    )
}

export default DeactivateAlert
