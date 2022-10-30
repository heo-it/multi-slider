import React, { useState, useRef, useEffect} from 'react';

const SliderBlock = function ({ colors, width, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [action, setAction] = useState('AUTO TRANSITION');

  return (
    <>
      <div className='card-wrapper'>
        <p>{action}</p>
        <div className='cards' style={{ width: width, height: height }}>
          <div className='card'>
            {colors[currentIndex]}
          </div>
          <div className='card'>
            {colors[currentIndex + 1]}
          </div>
        </div>
      </div>
      <code>{`[${colors.toString()}]`}</code>
    </>
  );
}

export default SliderBlock;