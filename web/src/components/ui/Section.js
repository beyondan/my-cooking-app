
import React from 'react';
// core ui
import {
  CssBaseline,
  Typography,
} from '@material-ui/core';
// src/
import theme from 'theme';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
    fontSize: '16px',
  },
}));

export default function Section(props) {
  const { 
    title,
    variant = 'h6',
  } = props;
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Typography variant={variant} className={classes.title}>
        {title}
      </Typography>
    </div>
  );
}