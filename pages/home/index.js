// https://mydomain/home

import React from 'react';
// core ui
import { 
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
// core ui - icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';

// src/
import RecipeCard from './RecipeCard';
import { Section } from 'components';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import theme from 'theme';

// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hlist: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
}));

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *                 Home                *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Home() {
  const classes = useStyles(theme);

  const myFavorites = [
    {
      id: 0,
      title: 'Shrimp and Chorizo Paella',
      author: 'Daniel Byun',
      summary: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      uploaded: '2021-07-19 23:04:32',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1591535375570-5f70748e0569?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
        },
      ],
    },
    {
      id: 1,
      title: 'Kimchi Stew',
      author: 'Daniel Byun',
      summary: 'Easy to cook and delicious comfort food. Never get tired of this!',
      uploaded: '2021-07-19 22:23:10',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1618351708186-5ba8a9da1933?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
      ],
    },
    {
      id: 2,
      title: 'Galbi Tang',
      author: 'Daniel Byun',
      summary: 'Somewhat difficult to make, but you will not be disappointed! Hated by nobody, everybodys favorite! You need to try this out today!',
      uploaded: '2021-07-19 20:19:43',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1478749485505-2a903a729c63?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
      ],
    },
  ]

  return (
    <MainLayout page={MainPages.Home}>
      <Grid container>
        <Grid item xs={12}>
          <Section title='My Favorites' />
        </Grid>
        <Grid container item xs={12}>
          <List className={classes.hlist}>
          {
            myFavorites.map((item, index) => {
              return (
                <ListItem>
                  <RecipeCard item={item}/>
                </ListItem>
              );  
            })
          }
          </List>
        </Grid>
      </Grid>
    </MainLayout>
  )
};
