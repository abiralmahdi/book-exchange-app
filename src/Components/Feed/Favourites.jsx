import React from 'react'
import Favourite from './Favourite'
import Alert from '@material-ui/lab/Alert';
import './PostsGrid/Favourites.css'

function Favourites() {
    return (
        <>
<h3 className='text-center text-muted mt-5 pt-5'>My Favourites</h3>

        <div className='mt-5 pb-5 d-flex'>
                
            <div>
                <Favourite/>
                <Favourite/>
                <Favourite/>
                <Favourite/>
                <Favourite/>
            </div>
            <div>
            <Alert variant="filled" className='ml-3 mt-5' id='alertt' severity="error" style={{width:350, backgroundColor:'black'}}>
               <h5> Did you know?<br/> The people of ancient Egypt used to write on Papyrus (used it like a paper), compiled them as a book and collected them in a house, which we today call as Library.</h5>
            </Alert>
            </div>
            
        </div>
</>
    )
}

export default Favourites
