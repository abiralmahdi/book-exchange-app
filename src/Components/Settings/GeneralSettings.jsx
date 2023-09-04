import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './GeneralSettings.css'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Cookies from 'universal-cookie'


export default function GeneralSettings(props) {
    const cookies = new Cookies
    
    const [userState, setuserState] = useState({})
    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [email, setemail] = useState()
    const [address, setaddress] = useState()
    const [genre, setgenre] = useState()
    const [contact, setcontact] = useState()

    React.useEffect(() => {
        async function fetchData(){
            const req = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUser/${props.username}`)
            setuserState(req.data)
            setfirstName(req.data.fname)
            setlastName(req.data.lname)
            setemail(req.data.email)
            setgenre(req.data.genres)
            setaddress(req.data.address)
            setcontact(req.data.contact)

        }
        fetchData()
    }
    , [])


    function handleSubmit(e){
        const req = axios.post(`http://127.0.0.1:8000/accounts/updateInfo/${localStorage.getItem('userID')}`,
            {
                "fname": firstName,
                "lname": lastName,
                "email": email,
                "contact": contact,
                "address": address,
                "genres": genre,
            })
        .then(
            res => {
                if (res.data === 200){
                    alert('Successfully updated your profile.')
                    if (email !== cookies.get('username', {path:'/'})){
                        alert('Since you have changed your username, please log in again.')
                        window.location.href = '/login'
                    }
                    else{window.location.href = '/'}
                    
                }
                else{
                    alert('There was a problem in the server, please try again after sometime.')
                }
            }
        )
        e.preventDefault()
    }

  return (
    <form className='container genSettingsForm' onSubmit={handleSubmit}>
        <h5 className='text-center m-3 font-weight-bold'>UPDATE GENERAL INFORMATION</h5>
        <div class="form-row">
            <div class="form-group col-md-6">
            <TextField
                required
                fullWidth
                name="fname"
                label="First Name"
                value={firstName}
                type="text"
                id="fname"
                autoComplete="fname"
                style={{ margin: 8 }}
                placeholder="First Name"
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setfirstName(e.target.value)}
                />
            </div>
            <div class="form-group col-md-6">
            <TextField
                    required
                    fullWidth
                    name="fname"
                    label="Last Name"
                    value={lastName}
                    type="text"
                    id="lname"
                    autoComplete="lname"
                    style={{ margin: 8 }}
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                  onChange={(e) => setlastName(e.target.value)}
                />
            </div>
        </div>
        <div class="form-group">
        <TextField
                    required
                    fullWidth
                    name="fname"
                    label="Address"
                    value={address}
                    type="text"
                    id="address"
                    autoComplete="address"
                    style={{ margin: 8 }}
                    placeholder="Address"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                  onChange={(e) => setaddress(e.target.value)}
                />
        </div>
        <div class="form-group">
        <TextField
                    required
                    fullWidth
                    name="contact"
                    label="Contact"
                    value={contact}
                    type="text"
                    id="contact"
                    autoComplete="contact"
                    style={{ margin: 8 }}
                    placeholder="Contact"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                  onChange={(e) => setcontact(e.target.value)}
                />
        </div>
        <div class="form-group">
        <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email and Username"
                    value={email}
                    type="email"
                    id="email"
                    autoComplete="email"
                    style={{ margin: 8 }}
                    placeholder="Email and Username"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                  onChange={(e) => setemail(e.target.value)}
                />
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
            <TextField
                    required
                    fullWidth
                    name="genre"
                    label='Favourite Genre'
                    value={genre}
                    type="text"
                    id="genre"
                    autoComplete="genre"
                    style={{ margin: 8 }}
                    placeholder="Favourite Genre"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                  onChange={(e) => setgenre(e.target.value)}
                />
            </div>
        </div>

        <Button
              type="submit"
              fullWidth={0}
              variant="contained"
              className='submitButton'
            >
            Update Information
            </Button>
    </form>
  );
}
