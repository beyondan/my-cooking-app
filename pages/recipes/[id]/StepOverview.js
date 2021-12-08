import React, { useEffect, useState } from 'react';
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
import { Section } from 'components/ui';
import theme from 'theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  section: {
    marginTop: theme.spacing(5),
  },
  hlist: {
    float: 'left',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 400,
    height: 300,
    objectFit: 'cover',
  },
  startButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function StepOverview(props) {
  const classes = useStyles(theme);
  const { recipe, onClickStart } = props;

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
          <Button
            className={classes.startButton}
            variant='contained'
            color='secondary'
            size='large'
            onClick={onClickStart}
          >
            Start
          </Button>
        </Grid>

        {/* Images */}
        <Grid item xs={12} className={classes.section}>
          <List className={classes.hlist}>
            {
              recipe.images.map((image, i) => (
                <ListItem key={i}>
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
                recipe.ingredients.map(ingr => (
                  <TableRow key={ingr.id}>
                    <TableCell component='th' scope='row'>
                      {ingr.id + 1}
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
                recipe.steps.map(step => (
                  <TableRow key={step.id}>
                    <TableCell component='th' scope='row'>
                      {step.id + 1}
                    </TableCell>
                    <TableCell align='left'>{step.text}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Grid>

        {/* Start button - start at sid 0. */}
        <Grid item xs={12} className={classes.section}>
          <Button
            className={classes.startButton}
            variant='contained'
            color='secondary'
            size='large'
            onClick={onClickStart}
          >
            Start
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}