import React, { useEffect, useState } from 'react';
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

// src/
import theme from 'theme';
// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 370;
const CARD_HEADER_HEIGHT = 50;
const CARD_HEADER_AVATAR_WIDTH = 35;
const CARD_HEADER_AVATAR_HEIGHT = 35;
const CARD_MEDIA_HEIGHT = 250;
const CARD_CONTENT_HEIGHT = 30;
const CARD_FOOTER_HEIGHT = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '15px 15px 5px rgba(0,0,0,0.6)',
  },
  link: {
    color: theme.palette.secondary.main,
  },
  cardHeader: {
    height: CARD_HEADER_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  avatar: {
    width: CARD_HEADER_AVATAR_WIDTH,
    height: CARD_HEADER_AVATAR_HEIGHT,
    margin: 'auto',
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '16px',
  },
  title: {
    width: CARD_WIDTH - CARD_HEADER_AVATAR_WIDTH - 50,
    marginTop: 5,
    paddingLeft: 5,
    color: theme.palette.text.primary,
    fontSize: '14px',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  author: {
    paddingLeft: 5,
    color: theme.palette.text.secondary,
    fontSize: '0.7rem',
    fontWeight: 'bold',
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  cardFooter: {
    width: CARD_WIDTH,
    height: CARD_FOOTER_HEIGHT,
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
}));

export default function RecipeCard(props) {
  const { recipe } = props;

  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container 
        style={{
          backgroundImage: `url(${recipe.images[0]['url']})`,
          backgroundSize: "cover",
        }}
      >

        {/* Card header */}
        <Grid
          className={classes.cardHeader} 
          container item xs={12}
        >
          <Grid item xs={2}>
            <Link href={`/account/${recipe.author}`}>
              <Avatar
                aria-label='recipe'
                className={classes.avatar}
              >
                DB
              </Avatar>
            </Link>
          </Grid>
          <Grid container item xs={8}>
            <div style={{float: 'top'}}>
              <Grid item xs={12}>
                <Link className={classes.link} href={`/recipes/${recipe.id}`}>
                  <Tooltip title={recipe.title} enterDelay={1000} placement='top'>
                    <Typography className={classes.title} noWrap>{recipe.title}</Typography>
                  </Tooltip>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link className={classes.link} href={`/account/${recipe.author}`}>
                  <Tooltip title={recipe.author} enterDelay={1000} placement='top'>
                    <Typography className={classes.author} noWrap>{recipe.author}</Typography>
                  </Tooltip>
                </Link>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>

        {/* Card media */}
        <Grid className={classes.cardMedia} item xs={12}>
          <Link href={`/recipes/${recipe.id}`}>
            {/* {
              recipe.images && recipe.images.length > 0 ? (
                <img className={classes.image} src={recipe.images[0]['url']} />
              ) : (
                <img className={classes.image} src='https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg' />
              )
            } */}
          </Link>
        </Grid>

        {/* Card content */}
        <Grid className={classes.cardContent} item xs={12}>
          <Typography
            variant='body2'
            color='textPrimary'
            component='p'
            noWrap
          >
            {recipe.summary}  
          </Typography>
        </Grid>

        {/* Card footer */}
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