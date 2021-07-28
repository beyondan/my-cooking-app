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
const CARD_MEDIA_HEIGHT = 250;
const CARD_CONTENT_HEIGHT = 30;
const CARD_FOOTER_HEIGHT = 40;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#fafafa',
  },
  link: {
    color: theme.palette.secondary.main,
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
    marginTop: 5,
    paddingLeft: 5,
    color: theme.palette.secondary.dark,
    fontSize: '0.9rem',
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  author: {
    paddingLeft: 5,
    color: theme.palette.secondary.light,
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
  },
  cardFooter: {
    width: CARD_WIDTH,
    height: CARD_FOOTER_HEIGHT,
    padding: 5,
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
        {
          recipe.images && recipe.images.length > 0 ?
            <Grid className={classes.cardMedia} item xs={12}>
              <Link href={`/recipes/${recipe.id}`}>
                <img className={classes.image} src={recipe.images[0]['url']} />
              </Link>
            </Grid>
            :
            null
        }

        {/* Card content */}
        <Grid className={classes.cardContent} item xs={12}>
          <Typography
            variant='body2'
            color='secondary'
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