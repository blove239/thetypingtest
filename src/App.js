import React, { useState } from 'react';
import './App.css';
import Test from './Components/Test';
import WordList from './Components/WordList';

const App = () => {
  const randomWords = require('random-words');
  const [testWords] = useState(randomWords({ exactly: 25 }))
  const [currentInput, setCurrentInput] = useState(' ');
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [currentCharNum, setCurrentCharNum] = useState(0);
  const [userInputWords, setUserInputWords] = useState([]);

  const onDeletion = (e) => {
    if (currentInput.length === 1) { 
      if (userInputWords.length === 0) {
        setCurrentInput(' ');
      }
      else {
        setUserInputWords(userInputWords.slice(0, -1));
        setCurrentInput(userInputWords.slice(-1)[0]);
        setCurrentWordNum(currentWordNum - 1);
        setCurrentCharNum(e.target.value.length - 1);
      }
    } else {
      setCurrentInput(e.target.value);
      setCurrentCharNum(currentCharNum - 1);
    }
  }

  const onSpacebar = () => {
    setUserInputWords([...userInputWords, currentInput]);
    setCurrentWordNum(currentWordNum + 1);
    setCurrentInput(' ');
    setCurrentCharNum(0);
  }

  const charCheck = (e) => {
    setCurrentInput(e.target.value);
    setCurrentCharNum(currentCharNum + 1);

    if (currentTestChar(e) === currentUserChar(e)) {

    } else {

    }
  }

  const currentTestChar = (e) => {
    return testWords[currentWordNum].charAt(currentCharNum);
  }

  const currentUserChar = (e) => {
    return e.target.value.substr(1).slice(-1);
  }

  const onInputChange = (e) => {
    if (e.target.value.length < currentInput.length) { 
      onDeletion(e);
    }
    else if (e.target.value.charAt(e.target.value.length - 1) === ' ') {
      onSpacebar();
    }
    else {
      charCheck(e);
    }
  }



  return (
    <div style={{ width: 500, margin: 50 }}>
      <WordList
        currentWordNum={currentWordNum}
        currentCharNum={currentCharNum}
        currentInput={currentInput}
        testWords={testWords}
      />

      <Test
        inputVal={currentInput}
        onChange={onInputChange}
      />  
    </div>
  )}

export default App 