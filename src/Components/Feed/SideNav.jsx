import React, {useState, useRef, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button'
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import FavoriteIcon from '@material-ui/icons/Favorite';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './SideNav.css'
import SecurityIcon from '@material-ui/icons/Security';
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import InputLabel from '@material-ui/core/InputLabel';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Cookies from 'universal-cookie';
import axios from 'axios'
import ImgMediaCard from './ImgMediaCard';


const drawerWidth = 240;


// App bar styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
  appBar: {
    backgroundColor: '#000',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    backgroundColor: '#000',
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));




export default function SideNav(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef()

  // Side Nav drawer states
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Add posts modal states
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Search modal states
  const [show2, setShow2] = React.useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const cookies = new Cookies()


  // Notification Menu States

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickNotif = (event) => {
    setAnchorEl(event.currentTarget);

    const req = axios.get(`http://127.0.0.1:8000/chat/viewedNotification/${localStorage.getItem('userID')}`)
    .then(
      res => {}
    )
  };

  const handleCloseNotif = () => {
    setAnchorEl(null);
  };


  // addPost function
  const [bookName, setbookName] = useState("")
  const [writerName, setwriterName] = useState("")
  const [genre, setgenre] = useState("")
  const [condition, setcondition] = useState("")
  const [desc, setdesc] = useState("")
  const [duration, setduration] = useState("")
  const [image1, setimage1] = useState("")
  const [image3, setimage3] = useState("")
  const [image2, setimage2] = useState("")

  function addPost(e){
  const req = axios.post('http://127.0.0.1:8000/postAdvertisement', {
    "id": 1,
    "title": bookName,
    "writer": writerName,
    "desc": desc,
    "duration": duration,
    "condition": condition,
    "user": props.userID,
    "genre": genre,
    "image1": image1.name
})
  .then(
    res=>{
      alert('Posted Successfully')
      handleClose()
      window.location.reload()
    }
  )
    e.preventDefault()
  }

  console.log()

  // Logout Function
  function Logout()
    {
      cookies.remove('username', { path: '/' });
      cookies.remove('password', { path: '/' });
      localStorage.removeItem('userID')
      localStorage.setItem('userFullName', 'Not Logged In')
      cookies.set('name', 'Not Logged In', { path: '/' });
      cookies.set('name', 'Logged Out', { path: '/' });
      props.setuserID(null)
      localStorage.setItem('message', 'Logged Out Successfully')
      props.setloggedIn(false)
      window.location.href = '/login'
    }

  
  // Search Function
  const [search, setsearch] = useState()
  const [books, setbooks] = useState([])
    function searchFunction(e){
      axios.get(`http://127.0.0.1:8000/search/${search}`)
      .then(
        res => {
          setbooks(res.data.posts)
          localStorage.setItem('books', JSON.stringify(res.data))
          handleShow2()
        }
      )  
      e.preventDefault()    
    }

    // Fetch Notifactions Function
    const [notifs, setnotifs] = useState([])
    const [notifsNew, setnotifsNew] = useState([])

    useEffect(() => {
      async function fetchNotifs(){
        const req = await axios.get(`http://127.0.0.1:8000/chat/fetchUserNotifications/${localStorage.getItem('userID')}`)
        setnotifs(req.data)

        const req2 = await axios.get(`http://127.0.0.1:8000/chat/fetchUserNotificationsNew/${localStorage.getItem('userID')}`)
        setnotifsNew(req2.data)

      }
      fetchNotifs()
    }, [notifs])


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link id='tradeMark' to='/' style={{color:'white', textDecoration:'none'}}>
            <Typography variant="h6" className={classes.title}>
              BooXchange
            </Typography>
          </Link>
          <div style={{margin:10, backgroundColor: 'white', width:'100%', display:'flex'}} id='searchBox'>
          <TextField
            id="outlined-full-width"
            fullWidth
            style={{margin:0}}
            margin="dense"
            variant="outlined"
            placeholder='Search for your favourite books'
            onChange={(e) => setsearch(e.target.value)}
          />
          <Button color="grey" onClick={searchFunction} ><SearchIcon/></Button>
          </div>
          <Button color="inherit" className='menuIcons' id='mobileSearch'><SearchIcon/></Button>
          {
            props.loggedIn === true 
            &&
            <>
              <Button color="inherit" className='menuIcons' onClick={handleShow}><AddIcon/></Button>
              <Badge badgeContent={notifsNew.length} color="error">
                <Button color="inherit" className='menuIcons' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickNotif}>
                  <NotificationsIcon/>
                </Button>
              </Badge>
              
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseNotif}
            > 
              {notifs.map(
                notif => (
                  <>
                  <Link to={notif.link}>
                    <div className='px-3 text-dark' onClick={handleCloseNotif} dangerouslySetInnerHTML={{__html: notif.desc}}></div>
                    <p className='px-3 text-muted text-sm'>{notif.time}</p>
                    <hr/>
                  </Link>
                  </>
                )
              )}
              
            </Menu>
            </>
          }
          
          
          {
          props.loggedIn === true
          ?
          <Button color="inherit" onClick={Logout}><ExitToAppIcon/></Button>
          :
          <Link  style={{color:'white'}} to='/login'><Button color="inherit"><AccountCircleIcon/></Button></Link>  
          }
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <span className='mr-auto btn btn-dark'>{cookies.get('name', {path:'/'})}</span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <h6 className='text-muted text-center mt-5 text-sm'>Menu Bar</h6>
        <List className='menuList'>
          <Link to='/'>
            <ListItem button key='Home'>
                  <ListItemIcon><HomeIcon /> </ListItemIcon>
                  <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link to='/genres'>
            <ListItem button key='Genres'>
                  <ListItemIcon><MenuBookIcon /> </ListItemIcon>
                  <ListItemText primary='Genres' />
            </ListItem>
          </Link>


        {/* Authenticated Users Accesspoint */}
        {props.loggedIn === true &&
        <>
          <Link to='/applicationsRecieved'>
            <ListItem button key='Application Recieved'>
                  <ListItemIcon><InboxIcon /> </ListItemIcon>
                  <ListItemText primary='Application Recieved' />
            </ListItem>
          </Link>
          <Link to='/applicationsSent'>
            <ListItem button key='Application Sent'>
                  <ListItemIcon><BusinessCenterIcon /> </ListItemIcon>
                  <ListItemText primary='Application Sent' />
            </ListItem>
          </Link>
          <Link to='myfavourites'>
            <ListItem button key='My Favourites'>
                  <ListItemIcon><FavoriteIcon /> </ListItemIcon>
                  <ListItemText primary='My Favourites' />
            </ListItem>
          </Link>
          <Link to='onExchange'>
            <ListItem button key='On Exchange'>
                  <ListItemIcon><BusinessCenterIcon /> </ListItemIcon>
                  <ListItemText primary='On Exchange' />
            </ListItem>
          </Link>
        </>
        }
        </List>

        <Divider />

        {props.loggedIn === true ?
        <>
        <List className='menuList'>
          <h6 className='text-muted text-center my-2 text-sm'>Account Settings</h6>
          <Link to='/settings/general'>
            <ListItem button key='General'>
                <ListItemIcon><SettingsIcon /> </ListItemIcon>
                <ListItemText primary='General' />
            </ListItem>
          </Link>
          <Link to='/settings/changePassword'>
            <ListItem button key='Security'>
                <ListItemIcon><SecurityIcon/> </ListItemIcon>
                <ListItemText primary='Security' />
            </ListItem>
          </Link>
          <Link to='/settings/deactivation'>
            <ListItem button key='Account Deleteion'>
                  <ListItemIcon><DeleteForeverIcon /> </ListItemIcon>
                  <ListItemText primary='Account Deletion' />
            </ListItem>
          </Link>
        </List>
        </>
        :
        <>
          <Link to='/login' style={{color:'black', textDecoration: 'none'}}>
            <ListItem button key='Login'>
                  <ListItemIcon><AccountCircleIcon /> </ListItemIcon>
                  <ListItemText primary='Login' />
            </ListItem>
          </Link>
        </>
        }
      </Drawer>


{/* Add post modal */}
        <Modal
            show={show}
            onHide={handleClose}
            className='modalDivv'
        >
          <form onSubmit={addPost} enctype="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Add a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body className='addPostBody'>
          
            <TextField className='addPosts' id="outlined-basic" label="Book Title" variant="outlined" onChange={(e) => setbookName(e.target.value)}/>
            <TextField className='addPosts' id="outlined-basic2" label="Name of Writer" variant="outlined" onChange={(e) => setwriterName(e.target.value)}/>
            <select className='addPosts form form-control' onChange={(e) => setgenre(e.target.value)}>
              <option>Genre</option>
              {props.genres.map(
                genre => (
                  <option value={genre.id}>{genre.name}</option>
                )
              )}
            </select>


            <select className='addPosts form form-control' onChange={(e) => setcondition(e.target.value)}>
              <option>Condition</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Mediocre</option>
              <option>Unsatisfactory</option>
              <option>Poor</option>
            </select>

            <TextField className='addPosts' id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setdesc(e.target.value)}/>
            <input className='addPosts form form-control' placeholder='Duration (Months)' type='number' onChange={(e) => setduration(e.target.value)}/>
            
            <InputLabel id="demo-simple-select-label" className='addPosts'>Images of the Book</InputLabel>
              <input className='addPosts' type='file' onChange={(e) => setimage1(inputRef.current.files[0])} ref={inputRef}/>
              <input className='addPosts' type='file' onChange={(e) => setimage2(e.target.input)}/>
              <input className='addPosts' type='file' onChange={(e) => setimage3(e.target.input)}/>
            
            
          
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" type='submit'>Submit</Button>
        </Modal.Footer>
        </form>
      </Modal>



      <Modal
            show={show2}
            onHide={handleClose2}
            id='searchModal'
            className='modalDivv'
        >
          <form onSubmit={addPost} enctype="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>Search Results of "{search}"</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <div className='searchedItems'>
                  {books.map(
                    book => (
                    <>
                      <div className='m-2'>
                        <ImgMediaCard 
                          name={book.title} 
                          author={book.writer} 
                          desc={book.desc} 
                          cond={book.condition} 
                          id={book.id} 
                          genreID={props.id} 
                          setbookID={props.setbookID} 
                          setbookGenre={props.setbookGenre}
                          handleClick={handleClose2}
                        />
                      </div>
                    </>
                    )
                  )}
                  
                </div>
          
        </Modal.Body>

        </form>
      </Modal>



    </div>
  );
}