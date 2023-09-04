import React, {useState, useEffect} from 'react'
import Nav from './Components/Feed/SideNav';
import Login from './Components/Accounts/Login'
import Register from './Components/Accounts/Register'
import Footer from './Components/Feed/Footer'
import PostsCards from './Components/Feed/PostsGrid/PostsCards';
import GenreCards from './Components/Feed/PostsGrid/GenreCards';
import MainCarousel from './Components/Feed/MainCarousel';
import Favourites from './Components/Feed/Favourites'
import IndivPage from './Components/Feed/IndivPage'
import UserProfile from './Components/Feed/UserProfile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ApplicationsRecieved from './Components/Feed/ApplicationsRecieved';
import Cookies from 'universal-cookie'
import axios from 'axios';
import OnExchange from './Components/Feed/OnExchange';
import ApplicationsSent from './Components/Feed/ApplicationsSent';
import ChangePassword from './Components/Settings/ChangePassword';
import DeactivateAlert from './Components/Settings/DeactivateAlert';
import GeneralSettings from './Components/Settings/GeneralSettings';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import {Modal, Form} from 'react-bootstrap'
import SendIcon from '@material-ui/icons/Send';
import './App.css'
import ChatBox from './Components/Chat/ChatBox';


function App() {


  // Authentication and Authorization Section
  const [loggedIn, setloggedIn] = useState(false)
  const [userID, setuserID] = useState()
  const cookies = new Cookies()

  let username = cookies.get('username', {path:'/'}) // Fetching the username if the user is logged in
  useEffect(() => {
    if (username !== undefined){
      setloggedIn(true)
    }

    // Get user ID
  async function fetchData(){
    const req = await axios.get('http://127.0.0.1:8000/accounts/fetchSingleUserReal/' + username)
      setuserID(req.data.id)
      localStorage.setItem('userID', req.data.id)
      localStorage.setItem('userFullName', req.data.first_name + ' ' + req.data.last_name)
  }
  fetchData()
}, [loggedIn, username])




  // Genre Section and Fetching all the users data
  const [genres, setgenres] = useState([])
  const [genreName, setgenreName] = useState([])
  const [allUsers, setallUsers] = useState([])
  
  useEffect(() => {
      async function fetchData(){
          const req = await axios.get('http://127.0.0.1:8000/fetchAllGenres')
          setgenres(req.data)

          const req2 = await axios.get('http://127.0.0.1:8000/accounts/fetchUsers')
          setallUsers(req2.data.customData)
          
      }
      fetchData()
  }, [])


  // All Posts Section
  const [categorizedPosts, setcategorizedPosts] = useState([])
  let nameList = []
  useEffect(() => {
    async function fetchData(){
        const req = await axios.get('http://127.0.0.1:8000/fetchAllPosts')
        setcategorizedPosts(req.data)

        // The genres which have books in it
        // Excluding the empty genres
        for (let i in req.data){
          nameList.push(req.data[i].genre)
        }
        setgenreName(nameList)
    }
    fetchData()
}, [])



// Dynamic Routing to the posts
const [bookID, setbookID] = useState()
const [bookGenre, setbookGenre] = useState()

// Dynamic Routing to the User Profile
const [userIDRouting, setuserIDRouting] = useState()
function routingUserID(userIDRt){
  setuserIDRouting(userIDRt)
  localStorage.setItem('userIDRouting', userIDRt)
}

// MessageBox Style and toggling functions

const [messageBoxStyling, setmessageBoxStyling] = useState({display : 'none'})

function toggleMessageBox(){
  if (messageBoxStyling.display === 'inline'){
    setmessageBoxStyling({display : 'none'})
  }
  else{
    setmessageBoxStyling({display : 'inline'})
  }
}




// ChatBox Modal, fetching the users conversations and text messages
const [showChat, setShowChat] = useState(false);
const [id, setid] = useState()

const handleCloseChat = () => setShowChat(false);

const handleShowChat = (id) => {
  setShowChat(true);
  setid(id)
  localStorage.setItem('chattingID', id)
  
};



  return (
    <Router>
      <Nav loggedIn={loggedIn} setloggedIn={setloggedIn} genres={genres} username={username} userID={userID} setuserID={setuserID} setbookID={setbookID} setbookGenre={setbookGenre}  bookID={bookID} bookGenre={bookGenre}/>
      
      <Switch>
        <Route exact path='/'>
          <MainCarousel/>
          <GenreCards genres={genres}/>
          {genres.map(
            genre => (
              <>
              {genreName.indexOf(genre.id) >= 0
              ?
              <PostsCards id={genre.id} name={genre.name} setbookID={setbookID} setbookGenre={setbookGenre}/>
              :
              <></>
            }
              
              </>
            )
          )}
          
        </Route>
        <Route exact path='/myfavourites'>
          <Favourites/>
        </Route>
        <Route exact path='/login'>
          <Login setloggedIn={setloggedIn}/>
        </Route>
        <Route exact path='/signup'>
          <Register/>
        </Route>
        <Route exact path='/posts/:postID'>
          <IndivPage bookID={bookID} bookGenre={bookGenre} setuserIDRouting={routingUserID} userID={userID} username={username}/>
        </Route>
        <Route exact path='/applicationsRecieved'>
          <ApplicationsRecieved userID={userID} setuserIDRouting={setuserIDRouting} setbookID={setbookID} setbookGenre={setbookGenre}/>
        </Route>
        <Route exact path='/userProfile/:userID'>
          <UserProfile userIDRouting={userIDRouting} setbookID={setbookID} setbookGenre={setbookGenre}/>
        </Route>
        <Route exact path='/onExchange'>
          <OnExchange/>
        </Route>
        <Route exact path='/applicationsSent'>
          <ApplicationsSent userID={userID} setuserIDRouting={setuserIDRouting} setbookID={setbookID} setbookGenre={setbookGenre}/>
        </Route>
        <Route exact path='/settings/changePassword'>
            <ChangePassword setloggedIn={setloggedIn}/>
        </Route>
        <Route exact path='/settings/deactivation'>
            <DeactivateAlert setloggedIn={setloggedIn}/>
        </Route>
        <Route exact path='/settings/general'>
            <GeneralSettings username={username}/>
        </Route>

      </Switch>
      <Footer/>
      {loggedIn === true 
      ?
      <>
      <button className='btn btn-dark msgBtn'><MailIcon style={{color: 'white'}} onClick={toggleMessageBox}/></button>
      <div className='inbox' style={messageBoxStyling}>
        <div className='d-flex'>
          <h3 className='text-light font-weight-bold m-3'>Inbox</h3>
            <button className='ml-auto btn btn-dark text-light mx-3 mt-3' onClick={toggleMessageBox}>Close</button>
          </div>
              <div className='inboxInner m-3'>
                {allUsers.map(
                  user => (
                  <div className='IndivDm p-3 m-1 d-flex' onClick={() => handleShowChat(user.username)}>
                    <Avatar>H</Avatar>
                      <p className='p-2'>{user.fname} {user.lname}</p>
                  </div>
                  )
                )}
              </div>
        </div>

          {/* the chatbox */}
          <ChatBox showChat={showChat} handleCloseChat={handleCloseChat} id={id} userID={userID}/>

        </>
        :
          <></>
        }
      

    </Router>
  );
}
 
export default App;
