// https://mydomain/home

import React from 'react';
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
import { RecipeCard, Section } from 'components';
import { MainLayout } from 'components/layouts';
import { MainPages, dummyRecipes } from 'globals';
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
 *              Recipes                *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function Index() {
  const classes = useStyles(theme);

  return (
    <MainLayout page={MainPages.Recipes}>
      <Grid container>
        <Grid item xs={12}>
          <Section title='My Favorites' />
        </Grid>
        <Grid container item xs={12}>
          <List className={classes.hlist}>
          {
            dummyRecipes.map((item, index) => {
              return (
                <ListItem key={`recipe_${index}`}>
                  <RecipeCard item={item}/>
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
