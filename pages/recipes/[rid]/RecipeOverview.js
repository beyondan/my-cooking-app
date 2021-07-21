
import React from 'react';

import {
  Button,
  Grid,
  List,
  ListItem,
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
  section: {
    marginTop: theme.spacing(5),
  },
  image: {
    height: 300,
    objectFit: 'cover',
  },
  startButton: {
    marginTop: theme.spacing(2),
  },
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
          <Grid item xs={10}>
            <h1 style={{color: theme.palette.secondary.main}}>
              {recipe.title}
            </h1>
          </Grid>

          {/* Start button - start at sid 0. */}
          <Grid item xs={2}>
            <Link href={`/recipes/${rid}/guide?sid=0`}>
              <Button
                className={classes.startButton}
                variant='contained'
                color='secondary'
                size='large'
              >
                Start
              </Button>
            </Link>
          </Grid>

          {/* Images */}
          <Grid item xs={12} className={classes.section}>
            <List>
              {
                recipe.images.map((image) => (
                  <ListItem>
                    <img className={classes.image} src={image.url} />
                  </ListItem>
                ))
              }
            </List>
          </Grid>

          {/* Ingredients */}
          <Grid item xs={12} className={classes.section}>
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
                  ingredients.map(ingr => (
                    <TableRow key={ingr.id}>
                      <TableCell component='th' scope='row'>
                        {ingr.iid + 1}
                      </TableCell>
                      <TableCell align='left'>{ingr.name}</TableCell>
                      <TableCell align='left'>{ingr.amount}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>

          {/* Steps */}
          <Grid item xs={12} className={classes.section}>
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
                  steps.map(step => (
                    <TableRow key={step.id}>
                      <TableCell component='th' scope='row'>
                        {step.sid + 1}
                      </TableCell>
                      <TableCell align='left'>{step.stepText}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>

          {/* Start button - start at sid 0. */}
          <Grid item xs={12} className={classes.section}>
            <Link href={`/recipes/${rid}/guide?sid=0`}>
              <Button
                className={classes.startButton}
                variant='contained'
                color='secondary'
                size='large'
              >
                Start
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