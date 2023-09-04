import React, {useEffect, useState} from 'react'
import ImgMediaCard from '../ImgMediaCard';
import  './PostsCards.css'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Button from '@material-ui/core/Button';
import axios from 'axios';

function PostsCards(props) {

    function scrollForward(){
        
        let div = document.getElementById(`cardDivScroll${props.id}`)
        if (div !== null){
            div.scrollLeft = div.scrollLeft + 300
        }
    }

    function scrollBackward(){
        let div = document.getElementById(`cardDivScroll${props.id}`)
        if (div !== null){
            div.scrollLeft = div.scrollLeft - 300
        }
    }

    const [books, setbooks] = useState([])
    useEffect(() => {
        async function fetchData(){
            const req = await axios.get(`http://127.0.0.1:8000/fetchCategorizedPosts/${props.id}`)
            setbooks(req.data)
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     setInterval(scrollForward, 3000);

    // }, [])

    return (
        <div className='my-5'>
            <div className='mb-2 mt-5 pt-5 headingDiv' style={{display:'flex', textAlign:'center'}}>
                <Button className='carouselButton forward' id='forward' onClick={scrollBackward}>
                        <ArrowBackIosIcon/>
                </Button>
                <h3 className='text-center mt-3 mx-3'>{props.name}</h3>
                <Button className='carouselButton backward' id='backward'  onClick={scrollForward}>
                        <ArrowForwardIosIcon/>
                </Button>
            </div>

            <div className='cards' id={`cardDivScroll${props.id}`}>
                
                {books.map(
                    book => (
                        <ImgMediaCard name={book.title} author={book.writer} desc={book.desc} cond={book.condition} id={book.id} genreID={props.id} setbookID={props.setbookID} setbookGenre={props.setbookGenre} />
                    )
                )}
                
                
            </div>

        </div>
    )
}

export default PostsCards
