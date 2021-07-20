import React from 'react';
// core ui
import { 
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography
} from '@material-ui/core';
// core ui - icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';

// src/
import theme from 'theme';

// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 370;
const CARD_HEADER_HEIGHT = 50;
const CARD_MEDIA_HEIGHT = 250;
const CARD_CONTENT_HEIGHT = 30;
const CARD_FOOTER_HEIGHT = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#efefef',
  },
  cardHeader: {
    height: CARD_HEADER_HEIGHT,
  },
  avatar: {
    margin: 'auto',
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    paddingTop: 5,
    paddingLeft: 5,
    color: theme.palette.primary.dark,
  },
  author: {
    paddingLeft: 5,
    color: theme.palette.primary.main,
  },
  cardMedia: {
    paddingTop: 5,
    width: CARD_WIDTH,
    height: CARD_MEDIA_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardContent: {
    width: CARD_WIDTH,
    height: CARD_CONTENT_HEIGHT,
    padding: 5,
  },
  cardFooter: {
    width: CARD_WIDTH,
    height: CARD_FOOTER_HEIGHT,
    padding: 5,
  },
}));

export default function RecipeCard(props) {
  const {
    item
  } = props;

  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container>

        <Grid className={classes.cardHeader} container item xs={12}>
          <Grid item xs={2}>
            <Avatar
              aria-label='recipe' 
              className={classes.avatar}
            >
              DB
            </Avatar>
          </Grid>
          <Grid container item xs={8}>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant='body2'
                component='p'
                noWrap
              >
                {item.title}  
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.author}
                variant='body2'
                component='p'
                noWrap
              >
                {item.author}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid className={classes.cardMedia} item xs={12}>
          <img className={classes.image} src={item.images[0]['url']} />
        </Grid>

        <Grid className={classes.cardContent} item xs={12}>
          <Typography
            variant='body2'
            color='secondary'
            component='p'
            noWrap
          >
            {item.summary}  
          </Typography>
        </Grid>

        <Grid className={classes.cardFooter} item xs={12}>
          <IconButton size='small' style={{color: theme.palette.primary.main}}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton size='small' style={{color: theme.palette.primary.main}}>
            <ShareOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}