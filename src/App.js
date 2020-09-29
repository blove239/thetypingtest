import React, { useEffect, useState } from 'react';
import Stats from './Components/Stats'
import Test from './Components/Test';
import TimerBar from './Components/TimerBar';
import WordList from './Components/WordList';
import randomWords from 'random-words';

import './App.css';

const App = () => {
  const [currentInput, setCurrentInput] = useState(' ');
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [currentCharNum, setCurrentCharNum] = useState(0);
  const [userInputWords, setUserInputWords] = useState([]);
  const [testWords, setTestWords] = useState(randomWords({ exactly: 200 }));
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestDone, setIsTestDone] = useState(false);
  const [resetTestWords, setResetTestWords] = useState(false);

  const testComplete = () => {
    setIsTestActive(false);
    setIsTestDone(true);
  }

  const resetTest = () => {
    setCurrentInput(' ');
    setCurrentWordNum(0);
    setCurrentCharNum(0);
    setUserInputWords([]);
    setTestWords(randomWords({ exactly: 200 }));
    setIsTestActive(false);
    setIsTestDone(false);
    setResetTestWords(true);
  }

  const onDeletion = (e) => {
    if (currentInput.length === 1) {
      if (userInputWords.length === 0) {
        setCurrentInput(' ');
      } else {
        setUserInputWords(userInputWords.slice(0, -1));
        setCurrentInput(userInputWords.slice(-1)[0]);
        setCurrentWordNum(currentWordNum - 1);
        setCurrentCharNum(e.target.value.length - 1);
      }
    } else {
      setCurrentInput((e.target.value === '') ? ' ' : e.target.value);
      setCurrentCharNum(e.target.value.length - 1);
    }
  }

  const onSpacebar = (e) => {
    setUserInputWords([...userInputWords, currentInput]);
    setCurrentWordNum(currentWordNum + 1);
    setCurrentInput(' ');
    setCurrentCharNum(0);
  }

  const onUserInput = (e) => {
    setCurrentInput(e.target.value);
    setCurrentCharNum(e.target.value.length - 1);
  }

  const onInputChange = (e) => {
    if (!isTestActive && !isTestDone) {
      setIsTestActive(true);
      setResetTestWords(false);
    } if (e.target.value.length < currentInput.length) {
      onDeletion(e);
    } else if (e.target.value.charAt(e.target.value.length - 1) === ' ') {
      onSpacebar(e);
    } else {
      onUserInput(e);
    }
  }

  return (
    <div style={{ width: 500, margin: 50 }}>
      <TimerBar
        isTestActive={isTestActive}
        isTestDone={isTestDone}
        testComplete={testComplete}
        resetTest={resetTest}
      />
      <Stats
        testWords={testWords}
        currentInput={currentInput}
      />
      <WordList
        currentWordNum={currentWordNum}
        currentCharNum={currentCharNum}
        currentInput={currentInput}
        testWords={testWords}
        resetTestWords={resetTestWords}
      />
      <Test
        inputVal={currentInput}
        onChange={onInputChange}
        isTestDone={isTestDone}
      />
    </div>
  )
}

export default App



