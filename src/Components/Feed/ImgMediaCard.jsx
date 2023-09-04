import React, {useState, useEffect} from 'react'
import CardActions from '@material-ui/core/CardActions';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
    minWidth: 280,
  },
});

export default function ImgMediaCard(props) {
  const classes = useStyles();


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
    if (props.handleClick !== undefined){
      props.handleClick()
    }

  }

  return (
  
    <Card className={classes.root} style={{marginTop: '0px'}}>
      
      <CardActionArea>
      <Link to={`/posts/${props.id}`} onClick={storeData}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
            title="Contemplative Reptile"
          />
        </Link>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <p className='text-muted text-sm'>{props.author} </p>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.desc.slice(0, 100)} ...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Request for Exchange
        </Button>
      </CardActions>
    </Card>
 
  );
}