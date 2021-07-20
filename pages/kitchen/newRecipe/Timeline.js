import React, { useCallback, useEffect, useRef, useState } from 'react';
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
// core ui - system
import { maxWidth } from '@material-ui/system';
// src/
// nextjs
// styles
import clsx from 'clsx';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '140px',
    border: '1px solid blue', 
  },
  canvas: {
    width: '100%',
    height: '140px',
    border: '1px solid red',
  }
}));

export default function Timeline(props) {
  const { timelineId } = props;
  const classes = useStyles();

  // canvas states
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState(null);

  // timeline states
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [stepRects, setStepRects] = useState([]);

  return (
    <div className={classes.root}>
      
    </div>
  );
};