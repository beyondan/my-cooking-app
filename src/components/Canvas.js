import React, { useEffect, useRef, useState } from 'react';


const useCanvas = (draw) => {

  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount++;
      const {width, height} = resizeCanvas(canvas);
      draw(context, width, height, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    }
    
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', startPaint);
    }
  }, [draw])

  return canvasRef;
}

export function getMousePosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (event.x - rect.left) / (rect.right - rect.left) * canvas.width,
    y: (event.y - rect.top) / (rect.bottom - rect.top) * canvas.height
  };
}

export default function Canvas(props) {
  const { draw, ...rest } = props;

  const canvasRef = useRef(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState({x: 0, y: 0});


  useEffect(() => {
    if (!canvasRef.current) {
        return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  return <canvas ref={canvasRef} {...rest} />
}