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
    prevUserInputWordsRef.current = userInputWords;
    prevCurrentWordNumRef.current = currentWordNum;
  }, [userInputWords, currentWordNum])

  const prevUserInputWords = prevUserInputWordsRef.current;
  const prevCurrentWordNum = prevCurrentWordNumRef.current;

  const updateCharStyles = () => {
    if (userInputWords.length <= word.length && isTestActive) {
      const newChars = chars.map((charInstance, i) => {
        const inputChar = userInputWords[i];
        const newChar = {
          ...charInstance,
          style: 'default'
        };
        if (charInstance.char === inputChar) {
          newChar.style = 'correct-char'
        } else if (inputChar && inputChar !== charInstance.char) {
          newChar.style = 'incorrect-char'
        }
        return newChar;
      })
      setChars(newChars);
    }
    if (userInputWords.length >= word.length &&
      (prevUserInputWords.length > userInputWords.length)) {
      setChars(chars => chars.slice(0, -1))
    }
    else if (userInputWords.length > word.length) {
      setChars(chars => chars.concat({
        char: userInputWords.slice(-1),
        style: 'incorrect-char',
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
        block: 'center'
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
    <li ref={scrollRef} className={(isCurrentWord) ? 'current-word li-word' : 'default li-word'}>
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
};

export default memo(Word, areEqual);
