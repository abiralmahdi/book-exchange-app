import React, {useEffect, useState} from 'react'
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import PostsCardsUser from './PostsGrid/PostsCardsUser';

function UserProfile(props) {

    const [userData, setuserData] = useState({})


    // The user ID of the profile
    const [usersID, setusersID] = useState()

    useEffect(() => {
        if (props.userIDRouting === undefined){
            let userIDRouting = localStorage.getItem('userIDRouting')
            setusersID(userIDRouting)
        }
        else {
            setusersID(props.userIDRouting)
        }
    
    }, [])


    // Indiv Users Data
    useEffect(() => {
        async function fetchData(){
            if (props.userIDRouting === undefined){
                const userID = localStorage.getItem('userIDRouting');
                const req = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUserUsingID/${userID}`)
                setuserData(req.data)
            }
            else {
                const req = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUserUsingID/${props.userIDRouting}`)
                setuserData(req.data)
            }
        }
        fetchData()
    }, [])



    // Books posted by this User
    const [userPosts, setuserPosts] = useState([])

    useEffect(() => {
        async function fetchData(){
            if (props.userIDRouting === undefined){
                const userID = localStorage.getItem('userIDRouting');
                const req = await axios.get(`http://127.0.0.1:8000/fetchPostsIndivUsers/${userID}`)
                setuserPosts(req.data)
            }
            else {
                const req = await axios.get(`http://127.0.0.1:8000/fetchPostsIndivUsers/${props.userIDRouting}`)
                setuserPosts(req.data)
            }
        }
        fetchData()
    }, [])


    return (
        <div className='container mt-5 pt-5'>
            <div>
                <div className='containerOwner container alert alert-dark'>
                    <img alt='' className='imgContainer2' src='https://www.british-study.com/en/wp-content/uploads/sites/2/2013/11/Pile-of-books-1.jpg'/>
                    <p className=''>
                        <h6 className='text-muted'>Posted By</h6>
                        <h3 className=''>{userData.fname} {userData.lname}</h3>
                        <p className='paragraphOwner pb-5'>
                            I am a bookworm and I love to read books all day. Typically, it takes 2 days for me to finish a whole big book. 
                            I love to paint and draw as well. Here I will be offering you my list of amazing old-read book  collections and in return I would like to gather some new books from y'all.<br/>    
                        </p>
                        <Button className='mr-2 my-2' variant='contained' color='primary' startIcon={<SendIcon/>}>Send Message</Button>
                    </p>
                </div>
            </div>
            <div style={{marginTop: '100px'}}>
                <h2 className='text-center font-weight-bold'>Other Books of this User </h2>
                <div>
                    {/* <PostsCards  id={genre.id} name={genre.name} setbookID={setbookID} setbookGenre={setbookGenre}/> */}
                    <PostsCardsUser id={usersID} userPosts={userPosts} setbookID={props.setbookID} setbookGenre={props.setbookGenre}/>
 
                </div>
            </div>
        </div>
    )
}

export default UserProfile
