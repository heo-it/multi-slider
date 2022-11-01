import React from 'react';
import styled from '@emotion/styled';
import useSwipe from '../hooks/useSwipe';

const Slider = function ({ colors, width, height }) {
  const {
    currentIndex,
    cardX,
    action,
    swipeEvents,
    handleSlide,
  } = useSwipe(colors);

  return (
    <>
      <div className='card-wrapper'>
        <p>{action}</p>
        <div className='cards' style={{ width: width, height: height }}>
          <SliderItem color={colors[handleSlide(currentIndex)]}>
            {colors[handleSlide(currentIndex)]}
          </SliderItem>
          <SliderItem
            id='card'
            color={colors[currentIndex]}
            cardX={cardX}
            {...swipeEvents}
          >
            {colors[currentIndex]}
          </SliderItem>
        </div>
      </div>
      <code>{`[${colors.toString()}]`}</code>
    </>
  )
}

export default Slider;

const SliderItem = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 0px 1px 1px rgb(0 0 0 / 20%);
  cursor: pointer;
  background-color: ${({ color }) => color};
  transform: translate3d(${({ cardX }) => cardX}%, 0, 0);
  opacity: ${({ cardX }) => 1 - Math.abs(cardX) / 100};
  transition: ${({ cardX }) => Math.abs(cardX) === 100 ? '0.3s ease 0s' : ''};
`;