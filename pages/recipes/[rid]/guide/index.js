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

import { Section, ErrorText } from 'components';
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

export default function Guide() {
  const classes = useStyles();

  const router = useRouter();

  const [rid, setRid] = useState();
  const [sid, setSid] = useState();
  const [recipe, setRecipe] = useState();
  const [steps, setSteps] = useState();
  const [step, setStep] = useState();

  useEffect(() => {
    const { rid, sid } = router.query;
    if (!rid) {
      return;
    }
    if (!sid) {
      router.replace(router.asPath + '?sid=0');
    }
    const basePath = `${MainPages.Recipes.href}/${rid}/guide`;

    if (Number(sid) < 0) {
      router.replace(`${basePath}?sid=0`);
    }

    const recipe = dummyRecipes.find(r => `${r.id}` === rid);
    const steps = dummySteps.filter(s => `${s.rid}` === rid);
    if (steps && Number(sid) > steps.length-1) {
      router.replace(`${basePath}?sid=${steps.length-1}`);
    }

    setRid(rid);
    setSid(sid);
    setRecipe(recipe);
    setSteps(steps);

    if (steps) {
      setStep(steps.find(s => `${s.sid}` === sid));
    }
  }, [router]);

  if (!rid || !sid|| !recipe || !steps || !step) {
    return <></>;
  }

  const basePath = `${MainPages.Recipes.href}/${rid}/guide`;

  const handleClickStep = (step, i) => {
    router.replace(`${basePath}?sid=${i}`);
  }

  const handleClickBackButton = (prevSid) => {
    router.replace(`${basePath}?sid=${prevSid}`);
  }

  const handleClickNextButton = (nextSid) => {
    router.replace(`${basePath}?sid=${nextSid}`);
  }

  return (
    <MainLayout page={MainPages.Recipes}>
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
                steps.map((step, i) => (
                  <ListItem>
                    <Button 
                      className={classes.stepButton}
                      variant={sid === `${i}` ? 'contained' : 'outlined'}
                      color='secondary'
                      size='small'
                      onClick={() => handleClickStep(step, i)}
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
                {step.stepText}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {
                Number(sid) > 0 ? (
                  <Button
                    className={classes.backButton}
                    variant='outlined'
                    color='secondary'
                    onClick={() => handleClickBackButton(Number(sid)-1)}
                  >
                    Back
                  </Button>
                ) : null
              }
              {
                Number(sid) < steps.length-1 ? (
                  <Button
                    className={classes.nextButton}
                    variant='contained'
                    color='secondary'
                    onClick={() => handleClickNextButton(Number(sid)+1)}
                  >
                    Next
                  </Button>
                ) : (
                  <Link href={`/recipes/${rid}/finish`}>
                    <Button
                      className={classes.finishButton}
                      variant='contained'
                      color='secondary'
                    >
                      Finish
                    </Button>
                  </Link>
                )
              }
            </Grid>
          </div>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
