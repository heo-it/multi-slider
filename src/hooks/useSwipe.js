import { useState, useRef } from 'react';
import useInterval from '../hooks/useInterval';

const parentWidth = 480;

const AUTO_TRANSITION = 'AUTO TRANSITION';
const CANCEL = 'CANCEL';
const SWIPE_RIGHT = 'SWIPE_RIGHT';
const SWIPE_LEFT = 'SWIPE_LEFT';
const FILP_RIGHT = 'FILP_RIGHT';
const FILP_LEFT = 'FILP_LEFT';

export default function useSwipe(colors) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardX, setCardX] = useState(0);
  const [action, setAction] = useState(AUTO_TRANSITION);
  const timestamp = useRef(0);

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
    setAction(AUTO_TRANSITION);
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
    setIsDragging(false);
    startX.current = null;

    if (cardX === 0) return;
    if (isDragging && !isNaN(cardX) && isFinite(cardX)) {
      if (Math.abs(cardX) < 50) {
        setCardX(0);
        setAction(CANCEL);
      } else if (cardX < 0) {
        setCardX(-100);
      } else {
        setCardX(100);
      }
    }
  }

  const handleSwipe = e => {
    if (startX.current) {
      if (!isDragging) setIsDragging(true);
      /**
       * @description Filp 기능 구현
       */
      const now = Date.now();
      const currentX = (getClientX(e) - startX.current) / parentWidth * 100;

      const dt = now - timestamp.current;
      const distance = currentX - cardX;

      const speed = (distance / dt).toFixed(2);
      timestamp.current = now;
      setCardX(currentX);

      if (cardX > 0) {
        setAction(`${speed > 0.5 ? FILP_RIGHT : SWIPE_RIGHT}`);
      } else if (cardX < 0) {
        setAction(`${speed < -0.5 ? FILP_LEFT : SWIPE_LEFT}`);
      }
    }
  };

  /**
   * @description 카드 클릭시 카드 색상 출력 기능
   */
  const handleClick = e => {
    if (action === AUTO_TRANSITION) {
      alert(`CLICK : ${colors[currentIndex]}`);
    } else {
      e.preventDefault();
    }
  }

  return {
    currentIndex,
    cardX,
    action,
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