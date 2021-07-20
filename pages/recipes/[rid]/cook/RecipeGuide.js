
import React from 'react';

import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Section } from 'components';
import { dummyRecipes, dummyIngredients, dummySteps } from 'globals';
import theme from 'theme';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  nextButton: {
    marginTop: theme.spacing(2),
  }

}));

export default function RecipeGuide(props) {
  const { rid } = props;
  const classes = useStyles(theme);
  const recipe = dummyRecipes.find(r => `${r.id}` == rid);

  if (recipe) {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Section variant='h5' title={recipe.title} />
          </Grid>
          <Grid item xs={12}>
            <Section title='' />
          </Grid>
        </Grid>
      </div>
    );
  }
  else {
    return <h1>No recipe found.</h1>
  }
}