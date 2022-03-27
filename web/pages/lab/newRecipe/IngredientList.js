import React from 'react';
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
  removeIngredientButton: {
    color: theme.palette.secondary.main,
  },
  addIngredientButton: {
    color: theme.palette.secondary.main,
  }
}));

export default function IngredientList(props) {
  const { 
    items,
    onChangeName,
    onChangeAmount,
    onClickRemove,
    onClickAdd
  } = props;

  const classes = useStyles();

  // TODO: optional/replaceable ingredients,
  // TODO: notes, images
  return (
    <div className={classes.root}>
      <CssBaseline />

      <Grid container>
        {
          items.map((item, index) => {
            return (
              <Grid container item xs={12} spacing={1} key={index}>
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
                    onChange={(e) => onChangeAmount(e, index)}
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
                    onChange={(e) => onChangeName(e, index)}
                    value={item.name}
                  />
                </Grid>
                
                <Grid item xs={1}>
                  {
                    (items.length >= 2) ? (
                      <Tooltip title='remove'>
                        <IconButton
                          className={classes.removeIngredientButton}
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
            );
          })
        }

        <Grid item xs={12}>
          <Tooltip title='add another ingredient'>
            <Button
              className={classes.addIngredientButton}
              variant='outlined'
              onClick={onClickAdd}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

    </div>
  );
}