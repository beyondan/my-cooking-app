
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
  startButton: {
    marginTop: theme.spacing(2),
  }

}));

export default function RecipeOverview(props) {
  const {rid} = props;
  const classes = useStyles(theme);

  const recipe = dummyRecipes.find(r => `${r.id}` === rid);

  if (recipe) {
    const ingredients = dummyIngredients.filter(i => `${i.rid}` === rid);
    const steps = dummySteps.filter(s => `${s.rid}` === rid);

    return (
      <div className={classes.root}>
        <Grid container>
          {/* Recipe title */}
          <Grid item xs={12}>
            <Section variant='h5' title={`${recipe.title}`} />
          </Grid>

          {/* Ingredients */}
          <Grid item xs={12}>
            <Section title='Ingredients' />
          </Grid>
          <Grid item xs={12}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  ingredients.map(i => (
                    <TableRow key={i.id}>
                      <TableCell component='th' scope='row'>
                        {i.iid + 1}
                      </TableCell>
                      <TableCell align='left'>{i.name}</TableCell>
                      <TableCell align='left'>{i.amount}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>

          {/* Steps */}
          <Grid item xs={12}>
            <Section title='Steps' />
          </Grid>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Step</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  steps.map(s => (
                    <TableRow key={s.id}>
                      <TableCell component='th' scope='row'>
                        {s.sid + 1}
                      </TableCell>
                      <TableCell align='left'>{s.stepText}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>

          {/* Start button */}
          <Grid item xs={12}>
            <Link href={`/recipes/${rid}/cook/${0}`}>
              <Button
                className={classes.startButton}
                variant='outlined'
                color='secondary'
                size='large'
              >
                Start cooking!
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    )
  }
  else {
    return <h1>None</h1>
  }
}