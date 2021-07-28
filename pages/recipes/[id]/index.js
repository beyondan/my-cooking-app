import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import { API, Section } from 'components';
import { MainLayout } from 'components/layouts';
import { MainPages } from 'globals';
import theme from 'theme';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

import Finish from './Finish';
import StepGuide from './StepGuide';
import StepOverview from './StepOverview';

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

export default function RecipesId() {
  const classes = useStyles(theme);
  const router = useRouter();

  const CookingStages = {
    NotStarted: 0,
    InProgress: 1,
    Finished: 2,
  }

  const [recipe, setRecipe] = useState();
  const [cookingStage, setCookingStage] = useState(CookingStages.NotStarted);
  const [stepId, setStepId] = useState(0);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    API.get(`/recipes/${id}`)
      .then(res =>{console.log(JSON.parse(res.data)); setRecipe(JSON.parse(res.data)); } )
      .catch(err => console.log(err));
  }, [router]);

  if (!recipe) {
    return <div></div>;
  }

  return (
    <MainLayout page={MainPages.Recipes}>
      {
        (cookingStage === CookingStages.NotStarted) ? (
          <StepOverview 
            recipe={recipe} 
            onClickStart={() => setCookingStage(CookingStages.InProgress)} />
        ) : (
          (cookingStage === CookingStages.InProgress) ? (
            <StepGuide 
              recipe={recipe}
              stepId={stepId}
              onClickStep={(stepId) => setStepId(stepId)}
              onClickBack={() => setStepId(stepId - 1)}
              onClickNext={() => setStepId(stepId + 1)}
              onClickFinish={() => setCookingStage(CookingStages.Finished)}
            />
          ) : (
            (cookingStage === CookingStages.Finished) ? (
              <Finish recipe={recipe} />
            ) : <></>
          )
        )
      }
    </MainLayout>
  );
}