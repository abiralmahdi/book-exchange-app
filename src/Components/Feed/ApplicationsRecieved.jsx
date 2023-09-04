import React, {useState, useEffect} from 'react'
import './PostsGrid/Favourites.css'
import ApplicantBooks from './ApplicantBooks';
import './ApplicationsRecieved.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

function ApplicationsRecieved(props) {

    // Bootstrap Modal States and Functions
    const [show, setShow] = React.useState(false);

    function handleShow(id){
        setShow(true)
    }

    function handleClose(id){
        localStorage.removeItem('selectedBook')
        setShow(false)
    }

    // LInk activation States
    const [linkActive, setlinkActive] = useState(false)


    // Fetching and storing the applications recieved by the user
    const [Applications, setApplications] = useState([])
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(`http://127.0.0.1:8000/fetchUsersApplications/${localStorage.getItem('userID')}`)
            setApplications(req.data)
            setlinkActive(true)
        }
        fetchData()
    }, [])


        // Deleting an Application sent by this user
        function deleteApplication(id){
            const req = axios.get(`http://127.0.0.1:8000/deleteUsersApplicationsSent/${id}`).then(
                res => {
                    if (res.data === 200){
                        alert('Application deleted')
                        const req = axios.get(`http://127.0.0.1:8000/fetchUsersApplications/${localStorage.getItem('userID')}`).then(
                            res2=> {
                                setApplications(res2.data)
                                setlinkActive(true)
                            }
                        )
                    }
                }
            )
        }

        
        // storing user data for user profile routing
        function storeUserData(id){
            props.setuserIDRouting(id)
            localStorage.setItem('userIDRouting', id)
        }


  // Storing the book data for dynamic routing
  function storeData(genre, book){
    props.setbookID(book)
    props.setbookGenre(genre)
    localStorage.setItem('bookID', book)
    localStorage.setItem('genreID', genre)
    if (props.handleClick !== undefined){
      props.handleClick()
    }

  }


    return (
        <>
<h3 className='text-center text-muted mt-5 pt-5'>All Applications</h3>

        <div className='mt-5 pb-5 d-flex'>
                
            <div className='container table table-striped table-responsive' style={{maxWidth:'1000px', height:'500px'}}>
                <table className='table'>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Book Applied</th>

                    </tr>
                    {Applications.map(
                        application => (
                            <>
                                <tr>
                                    <td>{application.applicant}</td>
                                    <Link to={linkActive? `/userProfile/${application.applicant}` : `#`} onClick={() => storeUserData(application.applicant)}><td>{application.applicantName}</td></Link>
                                    <td>{application.applicantEmail}</td>
                                    <Link to={linkActive?`/posts/${application.post1}` : `#`} onClick={() => storeData(application.genre, application.post1)}><td>{application.post1}. {application.post1Name}</td></Link>
                                    <td><button className='btn btn-sm btn-info'  onClick={()=> handleShow(application.applicant)}>View his books</button></td>
                                    <td><button className='btn btn-sm btn-danger' onClick={() => deleteApplication(application.id)}>Delete request</button></td>

                                </tr>
                                <ApplicantBooks applicantID={application.applicant} show={show} handleClose={handleClose} userID={props.userID} post1ID={application.post1}/>
                            </>
                        )
                    )}
                    
                    
                </table>
            </div>

        </div>
</>
    )
}

export default ApplicationsRecieved
