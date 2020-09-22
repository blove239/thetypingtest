import React, { useState } from 'react';
import './App.css';
import Test from './Components/Test';
import WordList from './Components/WordList';


const App = () => {
  const randomWords = require('random-words');
  const testWords = randomWords({ exactly: 30 });
  const [currentInput, setCurrentInput] = useState(" ");
  const [currentWordNum, setCurrentWordNum] = useState(0);
  const [currentCharNum, setCurrentCharNum] = useState(0);
  const [userInputWords, setUserInputWords] = useState([]);

  const onDeletion = (e) => {
    if (currentInput.length === 1) { // if user at start of a word
      if (userInputWords.length === 0) { // block user from deleting if at first word 
        setCurrentInput(' ');
      }
      else {
        // if user deleting at first character of a non first word
        // return the previous word in inputWords, among other things
        setUserInputWords(userInputWords.slice(0, -1));//removes last item from list
        setCurrentInput(userInputWords.slice(-1)[0]); // sets  current input to previous typed word
        setCurrentWordNum(currentWordNum - 1);
        setCurrentCharNum(0);
      }
    } else {// if deletion of a character of current word
      setCurrentInput(e.target.value);
      setCurrentCharNum(currentCharNum - 1);
    }
  }

  const onSpacebar = () => {
    setUserInputWords([...userInputWords, currentInput]);
    setCurrentWordNum(currentWordNum + 1);
    setCurrentInput(" ");
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
    if (e.target.value.length < currentInput.length) { // checks for deletion
      onDeletion(e);
    }
    else if (e.target.value.charAt(e.target.value.length - 1) === ' ') { //spacebar detection
      onSpacebar();
    }
    else { //if user typing a character
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
  );
}

export default App 