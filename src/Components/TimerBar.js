import React, { useState, useEffect } from 'react';
import '../css/timerbar.css';

const Progress = ({ width, elapsedTime }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((elapsedTime / 60) * width);
  }, [elapsedTime, width]);

  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        Time Remaining: {60 - elapsedTime}s
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
};

const TimerBar = ({ isTestActive, testComplete, resetTest, isTestDone }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isTestActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    if (seconds === 60) {
      testComplete();
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [seconds, isTestActive]);

  return (
    <div className="App">
      <div className="div">
        {isTestDone ? <button
          onClick={resetTest}> Start Over! </button> :
          <Progress width={400} elapsedTime={seconds} />}
      </div>
    </div>
  );
}

export default TimerBar;
