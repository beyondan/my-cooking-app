// https://mydomain/home

import React, { useEffect, useState } from 'react';
// core ui
import { 
  Grid,
  IconButton,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
// core ui - icons

// src/
import { API, RecipeCard, Section } from 'components';
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
 *               Home                  *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  const classes = useStyles(theme);
  const [recipes, setRecipes] = useState();

  useEffect(() => {
    API.get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, [])

  if (!recipes) {
    return <div></div>
  }

  return (
    <MainLayout page={MainPages.Home}>
      <Grid container>
        <Grid item xs={12}>
          <Section title='My Favorites' />
        </Grid>
        <Grid container item xs={12}>
          <List className={classes.hlist}>
          {
            recipes.map((recipe, index) => {
              return (
                <ListItem key={index}>
                  <RecipeCard recipe={recipe}/>
                </ListItem>
              );
            }) 
          }
          </List>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
