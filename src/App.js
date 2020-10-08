import React, { useState, useRef } from 'react';
import Stats from './Components/Stats'
import TimerBar from './Components/TimerBar';
import WordList from './Components/WordList';
import randomWords from 'random-words';

import './App.css';

const App = () => {
  const typingArea = useRef(null);
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [currentCharNum, setCurrentCharNum] = useState(0);
  const [userInputWords, setUserInputWords] = useState(['']);
  const [testWords, setTestWords] = useState(randomWords({ exactly: 250 }));
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestDone, setIsTestDone] = useState(false);
  const [resetTestState, setResetTestWords] = useState(false);

  const testComplete = () => {
    setIsTestActive(false);
    setIsTestDone(true);
  }

  const resetTest = () => {
    setCurrentWordNum(0);
    setCurrentCharNum(0);
    setUserInputWords(['']);
    setTestWords(randomWords({ exactly: 250 }));
    setIsTestActive(false);
    setIsTestDone(false);
    setResetTestWords(true);
  }

  const onDeletion = (e) => {
    if (userInputWords.length > 1 && userInputWords[currentWordNum].length === 0) {
      setUserInputWords(userInputWords.slice(0, -1));
      setCurrentWordNum(currentWordNum - 1);
      setCurrentCharNum(userInputWords.slice(0, -1).length);
    }
    else if (userInputWords[currentWordNum].length > 0) {
      setCurrentCharNum(currentCharNum - 1);
      let userInputs = [...userInputWords];
      userInputs[currentWordNum] = userInputs[currentWordNum].slice(0, -1);
      setUserInputWords(userInputs);
    }
  }

  const onSpacebar = (e) => {
    if (testWords[currentWordNum].length === userInputWords[currentWordNum].length) {
      setUserInputWords([...userInputWords, '']);
      setCurrentWordNum(currentWordNum + 1);
      setCurrentCharNum(0);
    }
  }

  const onUserInput = (e) => {
    setCurrentCharNum(currentCharNum + 1);
    let userInputs = [...userInputWords];
    userInputs[currentWordNum] = userInputs[currentWordNum].concat(e.key);
    setUserInputWords(userInputs);
  }

  const handleOnKeyPress = (e) => {
    if (!isTestActive) {
      setIsTestActive(true);
      setResetTestWords(false);
    } if (e.key === ' ') {
      onSpacebar(e);
    } else {
      onUserInput(e);
    }
  }

  const handleOnKeyDown = (e) => {
    if (e.key === "Backspace") {
      onDeletion(e);
    }
  }

  const handleClick = () => {
    typingArea.current.focus();
  }

  return (
    <div onClick={handleClick} style={{ width: '100vw', height: '100vh', margin: 5 }}>
      <TimerBar
        isTestActive={isTestActive}
        isTestDone={isTestDone}
        testComplete={testComplete}
        resetTest={resetTest}
      />
      <Stats
        testWords={testWords}
        userInputWords={userInputWords}
        currentWordNum={currentWordNum}
        currentCharNum={currentCharNum}
        isTestActive={isTestActive}
        resetTestState={resetTestState}
      />
      <WordList
        currentWordNum={currentWordNum}
        currentCharNum={currentCharNum}
        testWords={testWords}
        resetTestWords={resetTestState}
        userInputWords={userInputWords}
      />
      <input
        ref={typingArea}
        className='input'
        onKeyPress={handleOnKeyPress}
        onKeyDown={handleOnKeyDown}
        type="text"
        disabled={isTestDone}
        autoFocus
      />
    </div>
  )
}

export default App



