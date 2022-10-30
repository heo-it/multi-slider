import React, { useState, useRef, useEffect} from 'react';

const SliderBlock = function ({ colors, width, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [action, setAction] = useState('AUTO TRANSITION');

  return (
    <>
      <div>
        <p>{action}</p>
        <div>
          <div>
            {colors[currentIndex]}
          </div>
          <div>
            {colors[currentIndex + 1]}
          </div>
        </div>
      </div>
      <code>{`[${colors.toString()}]`}</code>
    </>
  );
}

export default SliderBlock;