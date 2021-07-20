
import React from 'react';
// core ui
import {
  CssBaseline,
  Typography,
} from '@material-ui/core';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  sectionTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.secondary.main,
  },
}));

export default function SectionTitle(props) {
  const { value } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Typography variant='body1' className={classes.sectionTitle}>
        {value}
      </Typography>
    </div>
  );
}