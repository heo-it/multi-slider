import React, { useState } from 'react';
import Slider from './Slider';

const SliderBlock = function ({ colors, width, height }) {
  const [action, setAction] = useState('AUTO TRANSITION');

  return (
    <>
      <div className='card-wrapper'>
        <p>{action}</p>
        <Slider colors={colors} width={width} height={height} />
      </div>
      <code>{`[${colors.toString()}]`}</code>
    </>
  );
}

export default SliderBlock;