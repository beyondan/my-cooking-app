import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

// core ui
import { 
  Avatar,
  CssBaseline,
  Grid,
  Hidden,
  IconButton,
  Link,
  Paper,
  Tooltip,
  Typography
} from '@material-ui/core';
// core ui - icons
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// src/
import theme from 'theme';
// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { NoEncryption } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 370;
const CARD_HEADER_HEIGHT = 60;
const CARD_MEDIA_HEIGHT = 250;
const CARD_CONTENT_HEIGHT = 30;
const CARD_FOOTER_HEIGHT = 30;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '15px 15px 5px rgba(0,0,0,0.6)',
  },
  link: {
    textDecoration: "none",
  },
  cardHeader: {
    height: CARD_HEADER_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  titleContainer: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  avatarContainer: {
    width: 30,
    height: 20,
    paddingLeft: 5,
    paddingTop: 1,
  },
  authorContainer: {
    width: CARD_WIDTH - 30,
    paddingBottom: 5,
  },
  title: {
    width: CARD_WIDTH,
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  avatar: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '12px',
  },
  author: {
    paddingLeft: 5,
    color: theme.palette.text.secondary,
    fontSize: '16px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardMedia: {
    width: CARD_WIDTH,
    height: CARD_MEDIA_HEIGHT,
  },
  cardContent: {
    width: CARD_WIDTH,
    height: CARD_CONTENT_HEIGHT,
    paddingTop: 5,
    paddingLeft: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  cardFooter: {
    width: CARD_WIDTH,
    height: CARD_FOOTER_HEIGHT,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
}));

export default function RecipeCard(props) {
  const { recipe } = props;

  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container>

        {/* Card header */}
        <Grid container item xs={12} className={classes.cardHeader}>

          {/* Recipe title */ }
          <Grid item xs={12} className={classes.titleContainer}>
            <Link href={`/recipes/${recipe.id}`} className={classes.link}>
              <Tooltip title={recipe.title}>
                <Typography display='block' noWrap className={classes.title}>{recipe.title}</Typography>
              </Tooltip>
            </Link>
          </Grid>

          {/* Recipe author */}
          <Grid item xs={1}>
            {/* Author avatar */}
            <div className={classes.avatarContainer}>
              <Link href={`/account/${recipe.author}`}>
                <Avatar aria-label='recipe' className={classes.avatar}>
                  DB
                </Avatar>
              </Link>
            </div>
          </Grid>
          <Grid item xs={11}>
            {/* Author name */}
            <div className={classes.authorContainer}>
              <Link href={`/account/${recipe.author}`} className={classes.link}>
                <Tooltip title={recipe.author}>
                  <Typography noWrap className={classes.author}>{recipe.author}</Typography>
                </Tooltip>
              </Link>
            </div>
          </Grid>

        </Grid>

        {/* Card media */}
        <Grid container item xs={12} direction="column" className={classes.cardMedia}>
          <Carousel swipeable emulateTouch showThumbs={false} style={{height: CARD_MEDIA_HEIGHT}}>
            {
              recipe.images.map((img, index) => (
                <div>
                  <img src={img['url']} style={{width: CARD_WIDTH, height: CARD_MEDIA_HEIGHT, objectFit: "cover"}}/>
                </div>
              ))
            }
          </Carousel>
        </Grid>
        

        {/* Card content */}
        <Grid item xs={12} className={classes.cardContent}
        >
          <Typography
            variant='body2'
            color='textPrimary'
            noWrap
          >
            {recipe.summary}  
          </Typography>
        </Grid>

        {/* Card footer */}
        <Grid className={classes.cardFooter} item xs={12}>
          <IconButton size='small' style={{color: theme.palette.text.secondary, bottom: 3}}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton size='small' style={{color: theme.palette.text.secondary, bottom: 3}}>
            <ShareOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}