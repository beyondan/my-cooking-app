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
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// src/
import theme from 'theme';
// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const CARD_WIDTH = 300;
const CARD_HEIGHT = 370;
const CARD_HEADER_HEIGHT = 50;
const CARD_HEADER_AVATAR_WIDTH = 40;
const CARD_HEADER_AVATAR_HEIGHT = 40;

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
    width: CARD_HEADER_AVATAR_WIDTH,
    height: CARD_HEADER_AVATAR_HEIGHT,
    top: '50%',
    '-ms-transform': 'translateY(-50%)',
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.secondary.dark,
    fontSize: '16px',
  },
  title: {
    width: CARD_WIDTH - CARD_HEADER_AVATAR_WIDTH - 50, // magic 50 to fit it.
    marginTop: 5,
    paddingLeft: 5,
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: 'bold',
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
    padding: 5,
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
  const [imageId, setImageId] = useState(0);
  const { recipe } = props;

  const classes = useStyles(theme);

  function hasNextImage() { return imageId < recipe.images.length-1; }
  function clickNextImage() { setImageId(imageId+1); }
  function clickPrevImage() { setImageId(imageId-1); }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container 
        style={{
          backgroundImage: `url(${recipe.images[imageId]['url']})`,
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
          <Grid container item xs={10}>
            <div style={{float: 'top'}}>
              <Grid item xs={12}>
                <Link className={classes.link} href={`/recipes/${recipe.id}`}>
                  <Tooltip title={recipe.title}>
                    <Typography className={classes.title} display='block' noWrap>{recipe.title}</Typography>
                  </Tooltip>
                </Link>
              </Grid>
              <Grid item xs={12}>
                <Link className={classes.link} href={`/account/${recipe.author}`}>
                  <Tooltip title={recipe.author}>
                    <Typography className={classes.author} noWrap>{recipe.author}</Typography>
                  </Tooltip>
                </Link>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {/* Card media */}
          <Grid container item xs={12} className={classes.cardMedia} direction="column">
            {
              imageId > 0 ?
              <Grid item xs={1}>
                <ArrowBackIosIcon 
                  onClick={clickPrevImage}
                  style={{
                    width: 20,
                    height: CARD_MEDIA_HEIGHT,
                    color: "rgba(0,0,0,0.6)"
                  }}/>
              </Grid> : null
            }

            <Grid item xs={12}>
              <Link href={`/recipes/${recipe.id}`}>
                <div style={{minWidth: CARD_WIDTH-40, maxWidth: CARD_WIDTH, height: CARD_MEDIA_HEIGHT}} />
              </Link>
            </Grid>

            {
              hasNextImage() ? 
              <Grid item xs={1}>
                <ArrowForwardIosIcon
                  onClick={clickNextImage}
                  style={{
                    width: 20,
                    height: CARD_MEDIA_HEIGHT,
                    color: "rgba(0,0,0,0.6)"
                  }}
                />
              </Grid> : null
            }
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