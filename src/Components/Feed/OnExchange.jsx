import React, {useState, useEffect} from 'react'
import './PostsGrid/Favourites.css'

import './ApplicationsRecieved.css'
import axios from 'axios';

function OnExchange(props) {


    // Fetching and storing the applications recieved by the user
    const [Exchanges, setExchanges] = useState([])
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(`http://127.0.0.1:8000/fetchUserExchanges/${localStorage.getItem('userID')}`)
            setExchanges(req.data)
        }
        fetchData()
    }, [])



    // Deleting an Application sent by this user
    function deleteDeal(id){
        let proceed = window.confirm('Cancelling the deal might decrease your review points and reputation. DO you still want to proceed? We dicourage cancelling deals unless its too necessary.')
        if (proceed){
            const req = axios.get(`http://127.0.0.1:8000/deleteExchanges/${id}`).then(
                res => {
                    if (res.data === 200){
                        alert('Deal deleted')
                        const req = axios.get(`http://127.0.0.1:8000/fetchUserExchanges/${localStorage.getItem('userID')}`).then(
                            res2=> {
                                setExchanges(res2.data)
                            }
                        )
                    }
                    else{
                        alert(JSON.stringify(res.data))
                    }
                }
            )
        }
        else{
            console.log('There is some error. Please try again later')
        }
   
        
    }


    return (
        <>
<h3 className='text-center text-muted mt-5 pt-5'>Books on Exchange</h3>

        <div className='mt-5 pb-5 d-flex'>
                
            <div className='container table table-striped table-responsive' style={{maxWidth:'1000px', height:'500px'}}>
                <table className='table'>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>His/Her Book</th>
                        <th>My Book</th>
                        <th>Date of Exchange</th>
                    </tr>
                    
                    {Exchanges.map(
                        exchange => (
                            <>
                            {
                            exchange.applicant === parseInt(localStorage.getItem('userID'))
                            ?
                            <tr>
                                <td>{exchange.user}</td>
                                <td>{exchange.usersName}</td>
                                <td>{exchange.userEmail}</td>
                                <td>{exchange.userContact}</td>
                                <td>{exchange.post1}. {exchange.post1Name}</td>
                                <td>{exchange.post2}. {exchange.post2Name}</td>
                                <td>{exchange.dateOfExchange}</td>
                                <td><button className='btn btn-success btn-sm'>Done</button></td>
                                <td><button className='btn btn-danger btn-sm' onClick={()=>deleteDeal(exchange.id)}>Cancel</button></td>
                            </tr>
                            :
                            <tr>
                                <td>{exchange.applicant}</td>
                                <td>{exchange.applicantName}</td>
                                <td>{exchange.applicantEmail}</td>
                                <td>{exchange.applicantContact}</td>
                                <td>{exchange.post2}. {exchange.post2Name}</td>
                                <td>{exchange.post1}. {exchange.post1Name}</td>
                                <td>{exchange.dateOfExchange}</td>
                                <td><button className='btn btn-success btn-sm'>Done</button></td>
                                <td><button className='btn btn-danger btn-sm' onClick={()=>deleteDeal(exchange.id)}>Cancel</button></td>
                            </tr>
                            }
                            </>
                        )
                    )}
                    
                </table>
            </div>

        </div>
</>
    )
}

export default OnExchange
