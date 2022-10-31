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
   * @description 카드 드래그 시 요소 이동 기능
   */
  const handleSwipeStart = e => {
    setIsDragging(true);
    startX.current = getClientX(e);
  }

  const handleSwipeEnd = e => {
    startX.current = null;
    setIsDragging(false);

    if (cardX === 0) return;
    if (isDragging && !isNaN(cardX) && isFinite(cardX)) {
      if (Math.abs(cardX) < 50) {
        setCardX(0);
      } else if (cardX < 0) {
        setCardX(-100);
      } else {
        setCardX(100);
      }
    }
  }

  const handleSwipe = e => {
    if (startX.current) {
      setCardX((getClientX(e) - startX.current) / parentWidth * 100);
      if (!isDragging) setIsDragging(true);
    }
  };

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
      onMouseDown: handleSwipeStart,
      onMouseUp: handleSwipeEnd,
      onMouseMove: handleSwipe,
      onTouchMove: handleSwipe,
      onTouchEnd: handleSwipeEnd,
      onMouseLeave: handleSwipeEnd,
      onClick: handleClick,
    }
  }
}