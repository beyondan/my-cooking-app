import React from 'react';
// core ui
import {
  CssBaseline,
  TextField,
} from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function RecipeTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <TextField 
        fullWidth
        color='secondary'
        label='recipe title'
        InputLabelProps={{ shrink: true }}
        variant='outlined'
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
}