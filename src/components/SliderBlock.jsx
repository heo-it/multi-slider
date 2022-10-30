import React, { useState, useRef, useEffect} from 'react';

const SliderBlock = function ({ colors, width, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [action, setAction] = useState('AUTO TRANSITION');
  const slideRef = useRef(null);

  /**
   * @description 자동 슬라이드 기능
   */
  useEffect(() => {
    const timer = setInterval(
      () => {
        slideRef.current.style.transform = 'translate3d(0%, 0, 0)';
        slideRef.current.style.opacity = 1;

        if (currentIndex < colors.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setCurrentIndex(0);
        }
      }, 3000);

    return () => {
      if (slideRef.current) {
        slideRef.current.style.transform = 'translate3d(100%, 0, 0)';
        slideRef.current.style.transition = '0.3s ease 0s';
        slideRef.current.style.opacity = 0;
      } 
      clearInterval(timer);
    };
  }, [currentIndex]);

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