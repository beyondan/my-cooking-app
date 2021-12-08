import React, { useState, useEffect } from 'react';

export default function Slider({
  width,
  height,
  slidesToShow,
  slidesToScroll,
  scrollSpeed,
  children
}) {

  const [sliderWidth, setSliderWidth] = useState(0);
  
  useEffect(() => {

  }, [width, height])

  return (
    <div style={{width: width, height: height}}>

    </div>
  );
}