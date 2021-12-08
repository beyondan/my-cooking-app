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
// src/
import theme from 'theme';
// styles
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { NoEncryption } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
  },
}));

export default function RecipeCard(props) {
  const { recipe, width, height } = props;

  const classes = useStyles(theme);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [mediaHeight, setMediaHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const _headerHeight = height/12*2;
    const _mediaHeight = height/12*8;
    const _contentHeight = height/12*1;
    const _footerHeight = height/12*1;

    setHeaderHeight(_headerHeight);
    setMediaHeight(_mediaHeight);
    setContentHeight(_contentHeight);
    setFooterHeight(_footerHeight);

  }, [width, height])

  return (
    <div
      style={{
        width: width,
        height: height,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '15px 15px 5px rgba(0,0,0,0.6)',
      }}
    >
      <CssBaseline />

      <Grid container>

        {/* Card header */}
        <Grid container item xs={12}
          style={{
            height: headerHeight,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}  
        >

          {/* Recipe title */ }
          <Grid item xs={12}
            style={{
              width: width,
              height: headerHeight/2,
            }}
          >
            <Link href={`/recipes/${recipe.id}`}
              className={classes.link}
            >
              <Tooltip title={recipe.title}>
                <Typography 
                  display='block' 
                  noWrap
                  style={{
                    width: width,
                    height: headerHeight/2,
                    color: theme.palette.text.primary,
                    fontSize: '14px',
                  }}
                >
                  {recipe.title}
                </Typography>
              </Tooltip>
            </Link>
          </Grid>

          {/* Recipe chef */}
          <Grid item xs={1}
            style={{
              width: width,
              height: headerHeight/2,
            }}
          >
            {/* Author avatar */}
            <div 
              style={{
                width: headerHeight/2,
                height: headerHeight/2,
                paddingLeft: 1,
              }}
            >
              <Link href={`/account/${recipe.chef['id']}`}>
                <Avatar aria-label='recipe'
                  style={{
                    width: 17,
                    height: 17,
                    backgroundColor: theme.palette.secondary.dark,
                    fontSize: '10px',
                  }}
                >
                  DB
                </Avatar>
              </Link>
            </div>
          </Grid>
          <Grid item xs={11}>
            {/* Chef name */}
            <div
              style={{
                width: width - headerHeight/2,
                marginLeft: 5,
              }}
            >
              <Link href={`/account/${recipe.chef['id']}`} className={classes.link}>
                <Tooltip title={recipe.chef['display_name']}>
                  <Typography noWrap
                    style={{
                      paddingLeft: 2,
                      color: theme.palette.text.secondary,
                      fontSize: '13px',
                    }}
                  >
                    {recipe.chef['display_name']}
                  </Typography>
                </Tooltip>
              </Link>
            </div>
          </Grid>

        </Grid>

        {/* Card media */}
        <Grid container item xs={12} direction="column"
          style={{
            width: width,
            height: mediaHeight,
          }}
        >
          <Carousel
            swipeable
            emulateTouch
            showThumbs={false}
            style={{
              height: mediaHeight
            }}
          >
            {
              recipe.images.map((img, index) => (
                <Link key={index} href={`/recipes/${recipe.id}`}
                  className={classes.link}
                >
                  <div>
                    <img src={img['url']}
                      style={{
                        width: width,
                        height: mediaHeight,
                        objectFit: "cover"
                      }}
                    />
                  </div>                  
                </Link>
              ))
            }
          </Carousel>
        </Grid>
        

        {/* Card content */}
        <Grid item xs={12} 
          className={classes.cardContent} 
          style={{
            width: width,
            height: contentHeight,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
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
        <Grid item xs={12}
          style={{
            width: width,
            height: footerHeight,
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
        >
          <IconButton
            style={{
              width: 0,
              height: 0,
              color: theme.palette.text.secondary,
            }}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            style={{
              width: 0,
              height: 0,
              color: theme.palette.text.secondary,
            }}
          >
            <ShareOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}