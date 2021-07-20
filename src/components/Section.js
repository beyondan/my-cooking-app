
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
    margin: theme.spacing(2, 0),
    color: theme.palette.secondary.main,
  },
}));

export default function Section(props) {
  const { title } = props;
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Typography variant='body1' className={classes.title}>
        {title}
      </Typography>
    </div>
  );
}