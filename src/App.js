import React, { useState, useRef } from 'react';
import Title from './Components/Title';
import Stats from './Components/Stats';
import TimerCircle from './Components/TimerCircle';
import WordList from './Components/WordList';
import Footer from './Components/Footer';
import { TEST_WORDS, KEYCODE_BACKSPACE } from './utils/constants'
import randomWords from 'random-words';
import './App.css';

const App = () => {
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [currentCharNum, setCurrentCharNum] = useState(0);
  const [userInputWords, setUserInputWords] = useState(['']);
  const [userInput, setUserInput] = useState('');
  const [testWords, setTestWords] = useState(randomWords({ exactly: TEST_WORDS }));
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestDone, setIsTestDone] = useState(false);
  const [resetTestState, setResetTestWords] = useState(false);
  const typingArea = useRef(null);

  const testComplete = () => {
    setIsTestActive(false);
    setIsTestDone(true);
  }

  const resetTest = () => {
    setCurrentWordNum(0);
    setCurrentCharNum(0);
    setUserInputWords(['']);
    setUserInput('');
    setTestWords(randomWords({ exactly: TEST_WORDS }));
    setIsTestActive(false);
    setIsTestDone(false);
    setResetTestWords(true);
  }

  const onDeletion = () => {
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

  const onSpacebar = () => {
    if (testWords[currentWordNum].length <= userInputWords[currentWordNum].length) {
      setUserInputWords([...userInputWords, '']);
      setCurrentWordNum(currentWordNum + 1);
      setCurrentCharNum(0);
    }
  }

  const onUserInput = (char) => {
    setCurrentCharNum(currentCharNum + 1);
    let userInputs = [...userInputWords];
    userInputs[currentWordNum] = userInputs[currentWordNum].concat(char);
    setUserInputWords(userInputs);
  }

  const handleOnKeyDown = (e) => {
    if (e.keyCode === KEYCODE_BACKSPACE) {
      onDeletion();
    }
  }

  const handleOnChange = (e) => {
    if (!isTestActive) {
      setIsTestActive(true);
      setResetTestWords(false);
    }

    let lastTypedChar = e.target.value[e.target.value.length-1];
    if(e.target.value.length > userInput.length) {
      if(lastTypedChar === ' '){
        onSpacebar();
      } else {
        onUserInput(lastTypedChar);
      }
    }
    setUserInput(e.target.value)
  }

  const handleClick = () => {
    typingArea.current.focus();
  }

  return (
    <div onClick={handleClick} className='app'>
      <input
        className='input'
        ref={typingArea}
        onKeyDown={handleOnKeyDown}
        onChange={handleOnChange}
        type='text'
        disabled={isTestDone}
        autoFocus
      />
      <div className='app-container'>
        <Title />
        <WordList
          currentWordNum={currentWordNum}
          currentCharNum={currentCharNum}
          testWords={testWords}
          resetTestWords={resetTestState}
          userInputWords={userInputWords}
          isTestActive={isTestActive}
        />
        <div className='row'>
          <div className='column'>
            <TimerCircle
              isTestActive={isTestActive}
              isTestDone={isTestDone}
              testComplete={testComplete}
              resetTest={resetTest}
            />
          </div>
          <div className='column'>
            <Stats
              testWords={testWords}
              userInputWords={userInputWords}
              currentWordNum={currentWordNum}
              currentCharNum={currentCharNum}
              isTestActive={isTestActive}
              resetTestState={resetTestState}
            />
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default App