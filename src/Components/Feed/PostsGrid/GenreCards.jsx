import React, {useEffect, useState} from 'react'
import  './GenreCards.css'
import GenreCard from '../GenreCard';
import axios from 'axios';

function GenreCards(props) {



    return (
        <div className=' my-5'>
        <h3 className='text-center my-2'>Genres</h3>
        <div className='cards'>
            {props.genres.map(
                genre => (
                    <GenreCard name={genre.name}/>
                )
            )}
        </div>
        </div>
    )
}

export default GenreCards
