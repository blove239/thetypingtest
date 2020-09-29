import React, { useState, useEffect, createRef, useRef } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = ({ word, isCurrentWord, currentInput, currentWordNum, resetTestWords }) => {
  const charList = word.split('').map((char, i) => {
    return {
      char: char,
      style: 'default',
      key: i
    };
  });

  const [chars, setChars] = useState(charList);
  const scrollRef = createRef();

  const updateCharStyles = () => {
    if (currentInput.length - 1 <= word.length) {
      const newChars = chars.map((charInstance, i) => {
        const inputChar = currentInput.substr(1)[i];
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
    }
  }

  useEffect(() => {
    if (resetTestWords) {
      setChars(charList);
    }
    else if (isCurrentWord) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      updateCharStyles();
    }
  }, [currentInput, currentWordNum, resetTestWords])

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
    <li ref={scrollRef} className={(isCurrentWord) ? 'currentWord' : 'default'}>
      {chars.map(x => renderChar(x.key, x.char, x.style))}
    </li>

  );
};

export default Word;
