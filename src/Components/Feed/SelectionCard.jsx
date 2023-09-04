import React, {useState, useEffect} from 'react'
import CardActions from '@material-ui/core/CardActions';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SelectionCard(props) {
  // Storing the genre ID
  const [genreID, setgenreID] = useState()
  useEffect(() => {
    async function fetchData(){
      const req = await axios.get(`http://127.0.0.1:8000/fetchIndivGenre/${props.id}`)
      setgenreID(req.data)
    }
    fetchData()
  }, [])



  // Storing the book data for dynamic routing
  function storeData(){
    props.setbookID(props.id)
    props.setbookGenre(genreID.id)
    localStorage.setItem('bookID', props.id)
    localStorage.setItem('genreID', genreID.id)
  }


  // Selecting the book for exchange

  function selectedBook(){
    localStorage.setItem('selectedBook', props.id)
    props.setselectedBookDetails(props.id)

  }

  function unselectedBook(){
    localStorage.removeItem('selectedBook')
    props.setselectedBookDetails('')
  }


  // Changing the Appearance of the card after it has been selected by the user
  let boxShd = "1px 1px 1px 1px #d4d2cd"
  if (props.selectedBookDetails === props.id){

    boxShd = "0 0 10px 0 #000"
  }

  const useStyles = makeStyles({
    root: {
      maxWidth: 280,
      minWidth: 280,
      boxShadow: boxShd,
    },
  });

  const classes = useStyles();
  return (
    <Card className={classes.root} id={`selectCard-${props.id}`}>
      <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
            title="Contemplative Reptile"
          />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name.slice(0, 17)}...
          </Typography>
          <p className='text-muted text-sm'>{props.author} </p>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc.slice(0, 50)} ...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{marginBottom: '20px'}}>
      <Link to={`/posts/${props.id}`} onClick={storeData} style={{textDecoration: 'none'}}>
        <button className='btn btn-dark'>
          View Details
        </button>
      </Link>

      {props.selectedBookDetails === props.id
      ?
      <button className='btn btn-danger' onClick={unselectedBook}>
        Selected
      </button>
      :
      <button className='btn ' onClick={selectedBook}>
        Select Book
      </button>}
      
      </CardActions>
    </Card>
 
  );
}