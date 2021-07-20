
import React from 'react';

import {
  Button,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { Section } from 'components';
import { dummyRecipes, dummyIngredients, dummySteps } from 'globals';
import theme from 'theme';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  nextButton: {
    marginTop: theme.spacing(2),
  },
}));

// TODO: Add images, more readable instructions.
export default function StepGuide(props) {
  const { rid, sid } = props;
  const nextSid = Number(sid) + 1;
  const displaySid = Number(sid) + 1;

  const classes = useStyles(theme);

  const recipe = dummyRecipes.find(r => `${r.id}` === rid);
  const steps = dummySteps.filter(s => `${s.rid}` === rid);

  if (recipe) {
    const step = steps.find(s => `${s.sid}` === sid);
    const isLastStep = sid == steps.length-1;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Section variant='h5' title={recipe.title} />
          </Grid>
          <Grid item xs={12}>
            <Section title={`Step ${displaySid}/${steps.length}`} />
          </Grid>
          <Grid item xs={12}>
            <Typography 
              variant='body2'
              color='primary'
            >
              {step.stepText}    
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link 
              href={isLastStep ? 
                `/recipes/${rid}/finish` :
                `/recipes/${rid}/cook/${nextSid}`}
              >
              <Button
                className={classes.nextButton}
                variant='contained'
                color='secondary'
              >
                { (isLastStep) ? 'Finish' : 'Next' }
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
  else {
    return <div></div>
  }
}