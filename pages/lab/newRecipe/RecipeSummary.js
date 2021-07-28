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
  text: {
    fontSize: '0.8em',
  }
}));

export default function RecipeSummary(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      
      <TextField 
        fullWidth multiline
        rows={6}
        color='secondary'
        label='recipe summary'
        InputLabelProps={{ shrink: true }}
        variant='outlined'
        onChange={props.onChange}
        value={props.value}
        size='small'
      />
    </div>
  );
}