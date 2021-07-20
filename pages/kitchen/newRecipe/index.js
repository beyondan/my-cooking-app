// https://mydomain/kitchen/create

import React, { useState } from 'react';
// core ui
import {
  Button,
  CssBaseline,
  Grid,
} from '@material-ui/core';
// src/
import { Section } from 'components';
import { KitchenLayout } from 'components/layouts';
import { KitchenPages } from 'globals';
import theme from 'theme';
// styles
import { makeStyles } from '@material-ui/core/styles';
// Child components
import IngredientList from './IngredientList';
import RecipeTitle from './RecipeTitle';
import StepList from './StepList';

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
 *     Kitchen - New Recipe - Index    *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function NewRecipe() {
  const classes = useStyles(theme);
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState([{name: '', amount: ''}]);
  const [steps, setSteps] = useState(['']);

  const handleChangeRecipeTitle = (e) => {
    setRecipeTitle(e.target.value);
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
    
  }

  return (
    <KitchenLayout page={KitchenPages.NewRecipe}>
      <div className={classes.root}>
        <CssBaseline />

        <Grid container>
          {/* RecipeTitle */}
          <Grid item xs={12}>
            <RecipeTitle 
              value={recipeTitle} 
              onChange={handleChangeRecipeTitle} 
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
              {'Review & Upload'}
            </Button>
          </Grid>
        </Grid>

      </div>

    </KitchenLayout>
  )
};
