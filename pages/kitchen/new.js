// https://mydomain/kitchen/create

import React, { useState } from 'react';
// core ui
import {
  Button,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
// core ui - icons
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// src/
import { KitchenLayout } from 'components/layouts';
import { Timeline } from 'components';
import { KitchenPages } from 'globals';
// nextjs
import Link from 'next/link';
// styles
import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sectionTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.secondary.main,
  },
  removeIngredientButton: {
    color: theme.palette.secondary.main,
  },
  addIngredientButton: {
    color: theme.palette.secondary.main,
  }
}));

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *        Kitchen - New Recipe         *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function New() {
  const classes = useStyles();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [ingredients, setIngredients] = useState([{name: '', amount: ''}]);
  const [timelineIds, setTimelineIds] = useState([0]);

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

  return (
    <KitchenLayout page={KitchenPages.NewRecipe}>
      <div className={classes.root}>
        <CssBaseline />

        <Grid container>

          {/* Left side: user inputs */}
          <Grid container item xs={8}>
            
            {/* Recipe title */}
            <Grid item xs={12}>
              <TextField 
                fullWidth
                color='secondary'
                label='recipe title'
                InputLabelProps={{
                  shrink: true,
                }}
                variant='outlined'
                onChange={e => setRecipeTitle(e.target.value)}
              >
                {recipeTitle}
              </TextField>
            </Grid>

            {/* Ingredients */}
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant='body1' className={classes.sectionTitle}>
                  Ingredients
                </Typography>
              </Grid>

              {
                ingredients.map((item, index) => {
                  return (
                    <Grid container item xs={12} spacing={1} key={`ingredient_${index}`}>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label='amount'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          color='secondary'
                          variant='outlined'
                          margin='dense'
                          onChange={e => handleChangeIngredientAmount(e, index)}
                          value={item.amount}
                        />
                      </Grid>
                      
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          label={`ingredient ${index + 1}`}
                          InputLabelProps={{ 
                            shrink: true,
                          }}
                          color='secondary'
                          variant='outlined'
                          margin='dense'
                          onChange={e => handleChangeIngredientName(e, index)}
                          value={item.name}
                        />
                      </Grid>
                      
                      <Grid item xs={1}>
                        {
                          (index > 0) ? (
                            <Tooltip title='remove'>
                              <IconButton
                                className={classes.removeIngredientButton}
                                size='medium'
                                onClick={e => handleClickRemoveIngredient(e, index)}
                              >
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          ) : <div />
                        }
                      </Grid>
                    </Grid>
                  );
                })
              }

              <Grid item xs={12}>
                <Tooltip title='add another ingredient'>
                  <Button
                    className={classes.addIngredientButton}
                    variant='outlined'
                    onClick={() => setIngredients([...ingredients, {name: '', amount: ''}])}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
            

            {/* Steps */}
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Typography variant='body1' className={classes.sectionTitle}>
                  Steps
                </Typography>
              </Grid>

              {
                timelineIds.map((timelineId) => {
                  return (
                    <Grid item xs={12} key={`grid_timeline_${timelineId}`}>
                      <Timeline id={timelineId} />
                    </Grid>
                  );
                })
              }

            </Grid>

          </Grid>
          
          {/* Right side: recipe overview */}
          <Grid container item xs={4}>

          </Grid>

        </Grid>

      </div>

    </KitchenLayout>
  )
};
