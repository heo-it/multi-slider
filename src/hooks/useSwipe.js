import React, { useState, useRef } from 'react';

export default function useSwipe(target) {

  /**
   * @description 카드 클릭시 카드 색상 출력 기능
   */
  const handleClick = e => {
    alert(`CLICK : ${target.current.innerText}`);
      e.preventDefault();
  }

  return {
    swipeEvents: {
      click: handleClick,
    }
  }
}