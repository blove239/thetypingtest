import React, { useState, useEffect, createRef, useRef, memo } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = ({ word, isCurrentWord, userInputWords, currentWordNum, resetTestState, isTestActive }) => {
  const charList = word.split('').map((char, i) => {
    return {
      char: char,
      style: 'default',
      key: i
    };
  });
  const [chars, setChars] = useState(charList);
  const scrollRef = createRef();

  const prevUserInputWordsRef = useRef();
  const prevCurrentWordNumRef = useRef();
  useEffect(() => {
    prevUserInputWordsRef.current = userInputWords[currentWordNum];
    prevCurrentWordNumRef.current = currentWordNum;
  }, [userInputWords, currentWordNum])

  const prevUserInputWords = prevUserInputWordsRef.current;
  const prevCurrentWordNum = prevCurrentWordNumRef.current;

  const updateCharStyles = () => {
    if (userInputWords[currentWordNum].length <= word.length && isTestActive) {
      const newChars = chars.map((charInstance, i) => {
        const inputChar = userInputWords[currentWordNum][i];
        const newChar = {
          ...charInstance,
          style: 'default'
        };
        if (charInstance.char === inputChar) {
          newChar.style = 'correctChar'
        } else if (inputChar && inputChar !== charInstance.char) {
          newChar.style = 'incorrectChar'
        }
        return newChar;
      })
      setChars(newChars);
    } if (userInputWords[currentWordNum].length >= word.length &&
      (prevUserInputWords.length > userInputWords[currentWordNum].length)) {
      setChars(chars => chars.slice(0, -1))
    } else if (userInputWords[currentWordNum].length > word.length) {
      setChars(chars => chars.concat({
        char: userInputWords[currentWordNum].slice(-1),
        style: 'incorrectChar',
        key: chars.length
      }))
    }
  }

  useEffect(() => {
    if (resetTestState) {
      setChars(charList);
    }
    if (isCurrentWord) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    if (isCurrentWord && prevCurrentWordNum === currentWordNum) {
      updateCharStyles();
    }
  }, [userInputWords, currentWordNum, resetTestState])

  const renderChar = (key, char, style) => {
    return (
      <Char
        key={key}
        style={style}
        char={char}
      />
    );
  };
  return (
    <li ref={scrollRef} className={(isCurrentWord) ? 'current-word' : 'default'}>
      {chars.map(x => renderChar(x.key, x.char, x.style))}
    </li>
  );
};

const areEqual = (prevProps, nextProps) => {
  if (nextProps.resetTestState) {
    return false;
  }
  else if (nextProps.currentWordNum + 1 === nextProps.index) {
    return false;
  }
  else if (nextProps.currentWordNum === nextProps.index) {
    return false;
  }
  else if (nextProps.currentWordNum - 1 === nextProps.index) {
    return false
  } else {
    return true;
  }
}

export default memo(Word, areEqual);
