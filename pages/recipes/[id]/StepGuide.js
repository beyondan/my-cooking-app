import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  Button, 
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

import { API, Section, ErrorText } from 'components';
import { MainLayout } from 'components/layouts';
import { MainPages, dummyRecipes, dummySteps } from 'globals';
import theme from 'theme';


import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stepButton: {
    // ?!: all 4 of these need to be set to do the right thing.
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',

    justifyContent: 'flex-start',
    margin: 0,
  },
  content: {
    padding: theme.spacing(3),
  },
  nextButton: {
    margin: theme.spacing(3, 3, 3, 0),
  },
  backButton: {
    margin: theme.spacing(3, 3, 3, 0),
  },
  finishButton: {
    margin: theme.spacing(3, 3, 3, 0),
  }
}));

export default function StepGuide(props) {
  const classes = useStyles();
  
  const {
    recipe,
    stepId,
    onClickStep,
    onClickBack,
    onClickNext,
    onClickFinish,
  } = props;

  const step = recipe.steps.find(s => s.id === props.stepId);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h5' color='secondary'>
          {recipe.title}
        </Typography>
      </Grid>

      <Grid container item xs={1}>
        <Grid item xs={12}>
          <List>
            {
              [...Array(recipe.steps.length).keys()].map(i => (
                <ListItem>
                  <Button 
                    className={classes.stepButton}
                    variant={step?.id === stepId  ? 'contained' : 'outlined'}
                    color='secondary'
                    size='small'
                    onClick={() => onClickStep(i)}
                  >
                    {i+1}
                  </Button>
                </ListItem>
              ))
            }
          </List>
        </Grid>
      </Grid>

      <Grid container item xs={11} className={classes.content}>
        <div style={{float: 'top'}}>
          <Grid item xs={12}>
            <Typography
              className={classes.stepText}
              variant='body2'
              color='secondary'
            >
              {step.text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {
              step.id > 0 ? (
                <Button
                  className={classes.backButton}
                  variant='outlined'
                  color='secondary'
                  onClick={onClickBack}
                >
                  Back
                </Button>
              ) : null
            }
            {
              step.id < recipe.steps.length-1 ? (
                <Button
                  className={classes.nextButton}
                  variant='contained'
                  color='secondary'
                  onClick={onClickNext}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={classes.finishButton}
                  variant='contained'
                  color='secondary'
                  onClick={onClickFinish}
                >
                  Finish
                </Button>
              )
            }
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
};
