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

const resizeCanvas = (canvas) => {
  const { width, height } = canvas.getBoundingClientRect();
  if (canvas.width !== width || canvas.height !== height) {
    const ratio = window.devicePixelRatio || 1;
    const context = canvas.getContext('2d');
    canvas.width = width*ratio;
    canvas.height = height*ratio;
    context.scale(ratio, ratio);
  }

  // Always return the CSS pixels for convenient drawing.
  return {width: width, height: height};
};


export default function Timeline(props) {
  const { timelineId } = props;
  const classes = useStyles();

  // canvas states
  const canvasRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [mousePosition, setMousePosition] = useState(null);

  // timeline states
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [stepRects, setStepRects] = useState([]);

  // Constants - some depend on the current state.
  const PADDING = () => 15;
  const CHAR = () => 5;
  const TIMELINE_X = () => PADDING();
  const TIMELINE_Y = () => PADDING() + CHAR();
  const TIMELINE_WIDTH = () => width - 2*PADDING();
  const TIMELINE_HEIGHT = () => height - 2*PADDING() - CHAR();

  // Utility functions
  const getMouseCoordinates = (event) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    return { 
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop
    };
  };

  const isMouseInTimeline = (x, y) => {
    return (
      x >= TIMELINE_X() && x <= TIMELINE_X() + TIMELINE_WIDTH() && 
      y >= TIMELINE_Y() && y <= TIMELINE_Y() + TIMELINE_HEIGHT()
    );
  };

  // mousedown on timeline = start adding step.
  const startAddingStep = useCallback((event) => {
    const coordinates = getMouseCoordinates(event);
    console.log(`${coordinates.x}, ${coordinates.y}`)
    if (coordinates && isMouseInTimeline(coordinates.x, coordinates.y)) {
      setIsAddingStep(true);
      setMousePosition(coordinates);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousedown', startAddingStep);
    return () => {
      canvas.removeEventListener('mousedown', startAddingStep);
    };
  }, [startAddingStep]);

  // mouseup on timeline = finish adding step.
  const finishAddingStep = useCallback((event) => {
    if (isAddingStep) {
      const newMousePosition = getMouseCoordinates(event);
      if (mousePosition && newMousePosition) {
        if (isMouseInTimeline(newMousePosition.x, newMousePosition.y)) {
          let x1, x2;
          if (mousePosition.x < newMousePosition.x) {
            x1 = mousePosition.x;
            x2 = newMousePosition.x;
          }
          else {
            x1 = newMousePosition.x;
            x2 = mousePosition.x;
          }

          const newStepRects = [...stepRects, {
            x: x1,
            y: TIMELINE_Y(),
            w: x2 - x1,
            h: TIMELINE_HEIGHT()
          }]
          setStepRects(newStepRects);
        }
      }
    }
    setIsAddingStep(false);
    setMousePosition(null);
  }, [isAddingStep, mousePosition]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', finishAddingStep);
    canvas.addEventListener('mouseleave', finishAddingStep);
    return () => {
      canvas.removeEventListener('mouseup', finishAddingStep);
      canvas.removeEventListener('mouseleave', finishAddingStep);
    }
  }, [finishAddingStep]);

  // Always draw this.
  const draw = (frameCount) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    ctx.fillText('0 min', PADDING(), PADDING());
    ctx.fillText('30', PADDING() + TIMELINE_WIDTH() - 2*CHAR(), PADDING());

    ctx.beginPath();
    ctx.rect(TIMELINE_X(), TIMELINE_Y(), TIMELINE_WIDTH(), TIMELINE_HEIGHT());
    ctx.closePath();
    ctx.stroke();

    stepRects.forEach(rect => {
      console.log(`${rect.x}, ${rect.y}, ${rect.w}, ${rect.h}`);
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.w, rect.h);
      ctx.closePath();
      ctx.fill();
    })
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      const {width, height} = resizeCanvas(canvas);
      setWidth(width);
      setHeight(height);
      draw(frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    }
    
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw]);

  return (
    <div className={classes.root}>
      <canvas ref={canvasRef} className={classes.canvas} id={timelineId} />
    </div>
  );
};