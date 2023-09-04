import React, {useState, useEffect} from 'react'
import {Modal, Button} from 'react-bootstrap'
import SelectionGrid from './PostsGrid/SelectionGrid';
import PostsCardsUser from './PostsGrid/PostsCardsUser';
import axios from 'axios'
import './ApplicationsRecieved.css'

const ApplicantBooks = (props) => {

    // Books posted by this User
    const [userPosts, setuserPosts] = useState([])
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(`http://127.0.0.1:8000/fetchPostsIndivUsers/${props.applicantID}`)
            setuserPosts(req.data)
        }
        fetchData()
    }, [])


    // Confirm Exchange
    function confirmExchange(){

        if (localStorage.getItem('selectedBook') === null){
            alert('Please select a book first')
        }
        else{
            var proceed = window.confirm("Are you sure you want to proceed to the exchange deal with this book?");
            if (proceed) {
                const req = axios.post(`http://127.0.0.1:8000/confirmExchange`, {
                    post2: localStorage.getItem('selectedBook'),
                    post1: props.post1ID,
                    applicantID: props.applicantID,
                    userID: props.userID
                }).then(
                    res => {
                        alert('Successfully made the exchange deal. Please visit the "On Exchange" tab to see further details. Confirm the location of exchnage by chatting with the person in the inbox.')
                        window.location.reload()
                    }
                )

            } else {
                //don't proceed
            }
        }
    }


    return (
        <Modal show={props.show} onHide={props.handleClose} id='booksCollectionModal'>
            <Modal.Header closeButton={true}>
            <Modal.Title>Applicant's Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <SelectionGrid/> */}
                <SelectionGrid id={props.applicantID} applicantID={props.applicantID} userPosts={userPosts} setbookID={props.setbookID} setbookGenre={props.setbookGenre}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={confirmExchange}>
                Confirm Exchange
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplicantBooks
