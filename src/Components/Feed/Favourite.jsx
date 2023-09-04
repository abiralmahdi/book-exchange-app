import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PanToolIcon from '@material-ui/icons/PanTool';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './PostsGrid/Favourites.css'


const useStyles = makeStyles((theme) => ({
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Favourite() {
  const classes = useStyles();

  return (
    <>
    {/* <CardMedia
        className=''
        image="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Live from space album cover"
        style={{width: 500, margin: 20}}
      /> */}
    <Card className='cardRoot'>
      <CardMedia
        className='cover'
        image="https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Live from space album cover"
        style={{width: 500, margin: 20}}
      />
      <div className='details'>
        <CardContent className='content'>
          <Typography component="h5" variant="h5">
            The Arabian Nights
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            This is the stroy of the old Arabian king who used to marry a girl every night, slept with her and used to kill his wife the next morning. The king was so obsessed with this thing that he could not control himself.
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Abir Al Mahdi
          </Typography>
        </CardContent>
        <div className='controls'>

          <IconButton aria-label="play/pause" disabled>
            <FavoriteIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="next">
            <PanToolIcon/>
          </IconButton>
          <IconButton aria-label="play/pause">
            <DeleteForeverIcon className={classes.playIcon} />
          </IconButton>
        </div>
      </div>
      
    </Card>
    </>
  );
}
