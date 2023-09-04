import React, {useState, useEffect} from 'react'
import './IndivPage.css'
import Button from '@material-ui/core/Button';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SendIcon from '@material-ui/icons/Send';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios' 
import Cookies from 'universal-cookie'

function IndivPage(props) {

    let cookies = new Cookies

    // Bootstrap modal states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Dynamic routing stuffs
    const bookID = localStorage.getItem('bookID')
    const genreID = localStorage.getItem('genreID')

    // State for storing the book details
    const [bookDetails, setbookDetails] = useState({})
    const [officialBookAuthor, setofficialBookAuthor] = useState('No Author Found')
    const [officialBookTitle, setofficialBookTitle] = useState()
    const [officialBookDesc, setofficialBookDesc] = useState('Not Found')
    const [officialBookPublisher, setofficialBookPublisher] = useState()
    const [userPosted, setuserPosted] = useState({})
    const [linkActive, setlinkActive] = useState(false)

    // State for checking if the book is already requested for exchange by the user 
    const [isRequested, setisRequested] = useState(false)


    useEffect(() => {
        async function fetchData(){
            // If the state becomes undefined due to page reload
            if (props.bookID === undefined || props.genreID === undefined){
                // fetching book data
                const req = await axios.get(`http://127.0.0.1:8000/posts/${genreID}/${bookID}`)
                setbookDetails(req.data)
                // fetching book data from Google Books API
                const reqGB = await axios.get(`http://127.0.0.1:8000/fetchOfficialBookData/${req.data.title}`)
                setofficialBookTitle(reqGB.data.volumeInfo.title)
                setofficialBookPublisher(reqGB.data.volumeInfo.publisher)
                setofficialBookAuthor(reqGB.data.volumeInfo.authors[0])
                setofficialBookDesc(reqGB.data.volumeInfo.description)
                // fetching user data
                const req2 = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUserUsingID/${req.data.user}`)
                setuserPosted(req2.data)
                setlinkActive(true)
                // Checking if the book is requested by the user
                const reqCheck = await axios.get(`http://127.0.0.1:8000/checkIsRequested/${req.data.id}/${localStorage.getItem('userID')}`)
                reqCheck.data.status === true ? setisRequested(true): setisRequested(false)
            }
            else {
                // fetching book data form user
                const req = await axios.get(`http://127.0.0.1:8000/posts/${props.genreID}/${props.bookID}`)
                setbookDetails(req.data)
                // fetching book data from Google Books API
                const reqGB = await axios.get(`http://127.0.0.1:8000/fetchOfficialBookData/${req.data.title}`)
                setofficialBookTitle(reqGB.data.volumeInfo.title)
                setofficialBookPublisher(reqGB.data.volumeInfo.publisher)
                setofficialBookAuthor(reqGB.data.volumeInfo.authors[0])
                setofficialBookDesc(reqGB.data.volumeInfo.description)
                // fetching user data
                const req2 = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUserUsingID/${req.data.user}`)
                setuserPosted(req2.data)
                setlinkActive(true)
                // Checking if the book is requested by the user
                const reqCheck = await axios.get(`http://127.0.0.1:8000/checkIsRequested/${req.data.id}/${localStorage.getItem('userID')}`)
                reqCheck.data.status === true ? setisRequested(true): setisRequested(false)
            }
        }
        fetchData()
    }, [])


    // storing user data for user profile routing
    function storeUserData(){
        props.setuserIDRouting(bookDetails.user)
        localStorage.setItem('userIDRouting', bookDetails.user)
    }




    // Requesting Exchange of Books by the logged in user to the user who posted
    function requestExchange(){
        if (localStorage.getItem('userID') === null || localStorage.getItem('userID') === undefined  || cookies.get('username',  { path: '/' }) === undefined || cookies.get('username',  { path: '/' }) === null){
            alert('Please Log in first')
        }
        else{
            const req = axios.post(`http://127.0.0.1:8000/requestExchange`, {
                post1: bookDetails.id,
                post1Name: bookDetails.title,
                genre:bookDetails.genre,
                user: bookDetails.user,
                applicant: localStorage.getItem('userID'),
                applicantName: localStorage.getItem('userFullName'),
                applicantEmail: props.username
            })
            .then(
                res=>{
                    if (res.status === 200){
                        setisRequested(true)
                        alert('You have successfully requested for an exchange of this book. The user will review your request and contact with you soon.')
                    }
                    else if (res.status === 401){
                        alert('This is your book and you cannot request yourself!!')
                    }
                    else{
                        alert('There is some internal server error. Please try again later or repost the problem in our community support. Sorry for the incovenience.')
                    }
                    
                }
            )
        }
    }


 
    return (
        <div className=''>
        <div className='container container2'>
            <div className='imgCont text-center'>
                <img alt='Image Unavailable' className='imgContainer' src='https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/Pile-of-books-1.jpg'/>
                <br/>
                <Button className='my-3' variant='contained' onClick={handleShow} startIcon={<MenuBookIcon/>}>Book Details</Button>
            </div>

            <div >
                <div className='descContainer'>
                    <h2 style={{textAlign:'left'}}>{bookDetails.title}</h2>
                    <h6 className='text-muted'>{bookDetails.writer}</h6>
                    <h6 className='text-muted'>Posted on: <b style={{textDecoration: 'underline'}}>{bookDetails.date}</b></h6>
                    <p className='h6 mt-5'>
                        {bookDetails.desc}
                    </p>
                    <ul className='conditionPoints'>
                        <li>Duration: {bookDetails.duration} months</li>
                        <li>Condition: {bookDetails.condition}</li>
                        {/* <li>Total Pages: 200</li> */}
                    </ul>
                </div>
                <div className=' text-center'>
                    {isRequested === true
                    ?
                    <Button className='mr-2 my-1' variant='contained' color='primary' startIcon={<AutorenewIcon/>} disabled>Application Pending</Button>
                    :
                    <Button className='mr-2 my-1' variant='contained' color='primary' startIcon={<AutorenewIcon/>} onClick={requestExchange}>Apply for Exchange</Button>    
                    }
                    
                    <Button className='ml-2 my-1' variant='contained' color='secondary' startIcon={<FavoriteIcon/>}>Favourite</Button>
                    
                </div>
            </div>
            
        </div>
        

        <div className='containerOwner container alert alert-dark mt-5'>
            <img alt='Image Unavailable' className='imgContainer2' src='https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/Pile-of-books-1.jpg'/>
            <p className=''>
                <h6 className='text-muted'>Posted By</h6>
                <h3 className=''>{userPosted.fname} {userPosted.lname}</h3>
                <p className='paragraphOwner pb-5'>
                    I am a bookworm and I love to read books all day. Typically, it takes 2 days for me to finish a whole big book. 
                    I love to paint and draw as well. Here I will be offering you my list of amazing old-read book  collections and in return I would like to gather some new books from y'all.
                    I am a bookworm and I love to read books all day. Typically, it takes 2 days for me to finish a whole big book. 
                    I love to paint and draw as well. Here I will be offering you my list of amazing old-read book  collections and in return I would like to gather some new books from y'all.
                    I am a bookworm and I love to read books all day. Typically, it takes 2 days for me to finish a whole big book. 
                    I love to paint and draw as well. Here I will be offering you my list of amazing old-read book  collections and in return I would like to gather some new books from y'all.<br/>    
                </p>
                <Button className='mr-2 my-2' variant='contained' color='primary' startIcon={<SendIcon/>}>
                    Send Message
                </Button>
                <Link to={linkActive? `/userProfile/${userPosted.username}` : `#`} onClick={storeUserData}>
                    <Button className='my-2' variant='contained' color='primary' startIcon={<AccountCircleIcon/>}>
                        Visit Profile
                    </Button>
                </Link>
            </p>
        </div>


        <Modal
            show={show}
            onHide={handleClose}
            className='modal'
        >
        <Modal.Header closeButton>
          <Modal.Title>Details from Google Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4><a href={`https://www.google.com/search?tbm=bks&q=${officialBookTitle}`} style={{color:'black'}}>{officialBookTitle}</a></h4>
            <p className='text-muted'>{officialBookAuthor}</p>
            <span className='font-weight-bold'>Publisher: {officialBookPublisher}</span><br/>
            {officialBookDesc}
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary">Understood</Button>
        </Modal.Footer>
      </Modal>


        </div>
    )
}

export default IndivPage
