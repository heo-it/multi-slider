import { useState, useRef } from 'react';
import useInterval from '../hooks/useInterval';

const parentWidth = 480;

export default function useSwipe(colors) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardX, setCardX] = useState(0);
  const getClientX = e => {
    if (e.type === 'touchstart') return e.touches[0].clientX;
    if (e.changedTouches) return e.changedTouches[0].clientX;
    return e.clientX;
  };

  /**
   * @description 자동 슬라이드 기능
   */
  const handleSlide = index => {
    if (index < colors.length - 1) {
      return index + 1;
    } else {
      return 0;
    }
  }

  useInterval(() => {
    setCardX(100);
  }, isDragging ? null : 3000);

  useInterval(() => {
    setCurrentIndex(prev => handleSlide(prev));
    setCardX(0);
  }, isDragging ? null : 3100);

  /**
   * @description 카드 클릭시 카드 색상 출력 기능
   */
  const handleClick = e => {
    alert(`CLICK : ${target.current.innerText}`);
      e.preventDefault();
  }

  return {
    currentIndex,
    cardX,
    handleSlide,
    swipeEvents: {
      onClick: handleClick,
    }
  }
}