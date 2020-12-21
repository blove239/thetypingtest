import React, { useEffect, useState } from 'react';
import { SIXTY_SECONDS, SMALL_SIZE, LARGE_SIZE } from '../utils/constants'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import '../css/timercircle.css';

const RenderTime = ({ remainingTime, resetTest, resetCircle }) => {
  if (remainingTime === 0) {
    return (
    <button className='reset-button'
      onMouseDown={(e) => {
        e.preventDefault();
        resetTest();  
        resetCircle();
      }}> Click Here to Start Over! </button>
    );
  } else {
    return (
      <div className='timer'>
        <div className='value'>{remainingTime}</div>
        <div className='text'>seconds</div>
      </div>
    );
  }
};

const TimerCircle = ({ isTestActive, testComplete, resetTest, isTestDone }) => {
  const [key, setKey] = useState(0);
  const resetCircle = () => { 
    setKey(key => key + 1);
  }

  const [timerSize, setTimerSize] = useState(window.matchMedia('(max-width: 768px)').matches
    ? SMALL_SIZE : LARGE_SIZE);

  useEffect(() => {
    function handleResize() {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setTimerSize(SMALL_SIZE);
      } else {
        setTimerSize(LARGE_SIZE);
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
  });

  return (
    <div className='timer-wrapper'>
      <CountdownCircleTimer
        key={key}
        isPlaying={isTestActive}
        duration={SIXTY_SECONDS}
        colors={[
          ['#4CC053', 0.415],
          ['#FFD300', 0.415],
          ['#FF554c', 0.17],
        ]}
        size={timerSize}
        onComplete={() => testComplete()}
      >
        {<RenderTime
          resetTest={resetTest}
          resetCircle={resetCircle}
        />}
      </CountdownCircleTimer>
    </div>
  );
};

export default TimerCircle;
