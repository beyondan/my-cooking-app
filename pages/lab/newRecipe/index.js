// https://mydomain/lab/create

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// core ui
import {
  Button,
  CssBaseline,
  Grid,
} from '@material-ui/core';
// src/
import { API, Section } from 'components';
import { LabLayout } from 'components/layouts';
import { LabPages } from 'globals';
import theme from 'theme';
// styles
import { makeStyles } from '@material-ui/core/styles';
// Child components
import IngredientList from './IngredientList';
import RecipeSummary from './RecipeSummary';
import RecipeTitle from './RecipeTitle';
import StepList from './StepList';

import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  uploadButton: {
    marginTop: '50px',
    textTransform: 'none',
  },
}));

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *       Lab - New Recipe - Index      *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function NewRecipe() {
  const classes = useStyles(theme);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeSummary, setRecipeSummary] = useState('');
  const [ingredients, setIngredients] = useState([{name: '', amount: ''}]);
  const [steps, setSteps] = useState(['']);
  const [canUpload, setCanUpload] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChangeRecipeTitle = (e) => {
    setRecipeTitle(e.target.value);
  }

  const handleChangeRecipeSummary = (e) => {
    setRecipeSummary(e.target.value);
  }

  // IngredientList props
  const handleChangeIngredientName = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index]['name'] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleChangeIngredientAmount = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index]['amount'] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleClickRemoveIngredient = (e, index) => {
    const newIngredients = ingredients.filter((item, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleClickAddIngredient = () => {
    setIngredients([...ingredients, {name: '', amount: ''}]);
  }

  // StepList props
  const handleChangeStep = (e, index) => {
    const newSteps = [...steps];
    newSteps[index] = e.target.value;
    setSteps(newSteps);
  };

  const handleClickRemoveStep = (e, index) => {
    const newSteps = steps.filter((item, i) => i !== index);
    setSteps(newSteps);
  }

  const handleClickAddStep = () => {
    setSteps([...steps, '']);
  }

  // Upload handling
  const handleClickUpload = () => {
    API.post('/recipes', {
      id: uuidv4(),
      author: 'Daniel Byun',
      title: recipeTitle,
      summary: recipeSummary,
      images: [],
      ingredients: ingredients.reduce((acc, ingr, index) => [...acc, {
        id: index,
        name: ingr.name,
        amount: ingr.amount,
      }], []),
      steps: steps.reduce((acc, stepText, index) => [...acc, {
        id: index,
        text: stepText,
      }], []),
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });

    setIsUploaded(true);
  }

  if (isUploaded) {
    return (
      <LabLayout page={LabPages.NewRecipe}>
        <div className={classes.root}>
          <CssBaseline />

          <Grid container>
            <Grid item xs={12}>
              <h1>Congratulations!</h1>
              <h1>You finished uploading {recipeTitle}</h1>
            </Grid>
            <Grid item xs={12}>
              <Link href='/lab'>
                <Button variant='outlined' color='secondary' size='large' style={{marginTop: theme.spacing(2)}}>
                  Return to lab.
                </Button>
              </Link>
            </Grid>

          </Grid>
        </div>
      </LabLayout>
    );
  }

  return (
    <LabLayout page={LabPages.NewRecipe}>
      <div className={classes.root}>
        <CssBaseline />

        <Grid container spacing={3}>
          {/* RecipeTitle */}
          <Grid item xs={12}>
            <RecipeTitle 
              value={recipeTitle} 
              onChange={handleChangeRecipeTitle} 
            />
          </Grid>

          {/* RecipeSummary */}
          <Grid item xs={12}>
            <RecipeSummary
              value={recipeSummary} 
              onChange={handleChangeRecipeSummary} 
            />
          </Grid>

          {/* Ingredients */}
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Section title='Ingredients' />
            </Grid>

            <Grid item xs={12}>
              <IngredientList 
                items={ingredients}
                onChangeName={handleChangeIngredientName}
                onChangeAmount={handleChangeIngredientAmount}
                onClickRemove={handleClickRemoveIngredient}
                onClickAdd={handleClickAddIngredient}
              />
            </Grid>
          </Grid>

          {/* Steps */}
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Section title='Steps' />
            </Grid>

            <Grid item xs={12}>
              <StepList 
                items={steps}
                onChangeStep={handleChangeStep}
                onClickRemove={handleClickRemoveStep}
                onClickAdd={handleClickAddStep} 
              />
            </Grid>
          </Grid>

          {/* Upload button */}
          <Grid item xs={12}>
            <Button
              className={classes.uploadButton}
              variant='contained'
              color='secondary'
              onClick={handleClickUpload}
            >
              {'Submit'}
            </Button>
          </Grid>
        </Grid>

      </div>

    </LabLayout>
  )
};
