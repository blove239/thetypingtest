import React, { useState, useEffect, createRef } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = ({ word, isCurrentWord, currentInput, currentWordNum }) => {
  let characterIndex = 0;
  const charList = [];
  for (let i = 0; i < word.length; i++) {
    charList.push({
      char: word[i],
      style: 'default',
      key: characterIndex
    });
    characterIndex += 1;
  }
  const [chars, setChars] = useState(charList);
  const scrollRef = createRef();

  const setChar = (str, i) => {
    return {
      char: chars[i].char,
      style: str,
      key: chars[i].key
    }
  }

  const updateCharStyles = () => {
    if (currentInput.length - 1 <= word.length) {
      let newChars = [];
      for (let i = 0; i < chars.length; i++) {
        const currentChar = currentInput.substr(1)[i];
        if (currentChar === undefined) {
          newChars[i] = setChar('default', i)
        } else if (chars[i].char === currentChar) {
          newChars[i] = setChar('correctChar', i)
        } else {
          newChars[i] = setChar('incorrectChar', i)
        }
      }
      setChars(newChars);
    }
  }

  useEffect(() => {
    if (isCurrentWord) {
      scrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      updateCharStyles();
    }
  }, [currentInput, currentWordNum])

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
      {chars.map(x => renderChar(x.key, x.char, x.style),
      )}
    </li>

  );
};

export default Word;
