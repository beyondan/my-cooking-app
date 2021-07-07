// https://mydomain/kitchen/create

import React from 'react';
// core ui
import {
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
// src/
import { KitchenLayout } from 'components/layouts';
import { KitchenPages } from 'globals';

/* * * * * * * * * * * * * * * * * * * *
 *                                     *
 *        Kitchen - New Recipe         *
 *                                     *
 * * * * * * * * * * * * * * * * * * * */
export default function New() {
  return (
    <KitchenLayout page={KitchenPages.NewRecipe}>
      <Grid container>
        <Grid item xs={12}>
          <TextField 
            fullWidth
            color='secondary'
            placeholder='Enter recipe name ...'
            variant='outlined'
            margin='dense'
            />
          
          <Typography variant='body1'>
            Ingredients
          </Typography>
        </Grid>
      </Grid>

    </KitchenLayout>
  )
};
