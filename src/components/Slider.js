import React, { useEffect, useState, useRef } from 'react';
import useInterval from '../hooks/useInterval';
import styled from '@emotion/styled';

const Slider = function ({ colors, width, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentDom = useRef(null);

  /**
   * @description 자동 슬라이드 기능
   */
  function handleSlide(index) {
    if (index < colors.length - 1) {
      return index + 1;
    } else {
      return 0;
    }
  }

  useInterval(() => {
    currentDom.current.style = animationStyle(colors[currentIndex]);
  }, 3000);

  useInterval(() => {
    /** handle Index */
    setCurrentIndex(prev => handleSlide(prev));
  }, 3100);

  useEffect(() => {
    currentDom.current.style = orgStyle(colors[currentIndex]);
  }, [currentIndex]);

  return (
    <div className='cards' style={{ width: width, height: height }}>
      <SliderItem
        color={colors[handleSlide(currentIndex)]}
        isNext={true}
      >
        {colors[handleSlide(currentIndex)]}
      </SliderItem>
      <SliderItem
        id='card'
        ref={currentDom}
        color={colors[currentIndex]}
        isCurrent={true}
      >
        {colors[currentIndex]}
      </SliderItem>
    </div>
  )
}

export default Slider;


const animationStyle = color => `
  background-color:${color};
  transform: translate3d(100%, 0, 0);
  opacity: 0;
  transition: 0.3s ease 0s
`;

const orgStyle = color => `
  background-color:${color};
  transform: translate3d(0%, 0, 0);
  opacity: 1;
  transition: ''
`;

const SliderItem = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 20%);
  background-color: ${({ color }) => color};
  transform: translate3d(0%, 0, 0);
`;