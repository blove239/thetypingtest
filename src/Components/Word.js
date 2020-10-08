import React, { useState, useEffect, createRef, useRef } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = ({ word, isCurrentWord, userInputWords, currentWordNum, resetTestState }) => {
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
  useEffect(() => {
      prevUserInputWordsRef.current = userInputWords[currentWordNum];
  }, [userInputWords])

  const prevUserInputWords = prevUserInputWordsRef.current;

  const updateCharStyles = () => {
    if (userInputWords[currentWordNum].length <= word.length) {
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
    } if (userInputWords[currentWordNum].length >= word.length && (prevUserInputWords.length > userInputWords[currentWordNum].length)){
      setChars(chars => chars.slice(0,-1))
    }
    else if (userInputWords[currentWordNum].length > word.length) {
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
    <li ref={scrollRef} className={(isCurrentWord) ? 'currentWord' : 'default'}>
      {chars.map(x => renderChar(x.key, x.char, x.style))}
    </li>

  );
};

export default Word;
