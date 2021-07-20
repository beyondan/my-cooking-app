import React, { useState } from 'react';
// core ui
import {
  Button,
  CssBaseline,
  Grid,
  IconButton,
  TextField,
  Tooltip,
} from '@material-ui/core';
// core ui - icons
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// styles
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  removeStepButton: {
    color: theme.palette.secondary.main,
  },
  addStepButton: {
    color: theme.palette.secondary.main,
  }
}));

// TODO: images, step granularity check.
export default function StepList(props) {
  const {
    items,
    onChangeStep,
    onClickRemove,
    onClickAdd,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container>
        {
          items.map((item, index) => {
            return (
              <Grid container item xs={12} spacing={1} key={`step_${index}`}>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    label={`step ${index + 1}`}
                    InputLabelProps={{ shrink: true }}
                    color='secondary'
                    variant='outlined'
                    margin='dense'
                    onChange={(e) => onChangeStep(e, index)}
                    value={item}
                  />
                </Grid>
                
                <Grid item xs={1}>
                  {
                    (items.length >= 2) ? (
                      <Tooltip title='remove'>
                        <IconButton
                          className={classes.removeStepButton}
                          size='medium'
                          onClick={(e) => onClickRemove(e, index)}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    ) : <div style={{width: 40}}/>
                  }
                </Grid>
              </Grid>
            )
          })
        }

        <Grid item xs={12}>
          <Tooltip title='add another step'>
            <Button
              className={classes.addStepButton}
              variant='outlined'
              onClick={onClickAdd}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  )
}