import React, { useState, useEffect } from 'react';
import '../css/timerbar.css';

const Progress = ({ width, elapsedTime }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue((elapsedTime / 60) * width);
  });

  return (
    <div>
      <div className="progress-div" style={{ width: width }}>
        <div style={{ width: `${value}px` }} className="progress" />
      </div>
    </div>
  );
};

const TimerBar = ({ isTestActive, isTestDone, testComplete, resetTest }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isTestActive && !isTestDone) {
      interval = setInterval(() => {
        setSeconds(percent => percent + 1);
        console.log(seconds)
      }, 1000);
    }
    if (seconds === 8) {
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
