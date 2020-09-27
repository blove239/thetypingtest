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
  //  const fieldRef = useRef<HTMLInputElement>(null);
  const ref = createRef();

  useEffect(() => {
    if (isCurrentWord) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      const userChars = JSON.parse(JSON.stringify(chars));
      if (currentInput.length - 1 <= word.length) {
        for (let i = 0; i < chars.length; i++) {
          const currentChar = currentInput.substr(1)[i];
          if (currentChar === undefined) {
            userChars[i].style = 'default';
          } else if (userChars[i].char === currentChar) {
            userChars[i].style = 'correctChar';
          } else {
            userChars[i].style = 'incorrectChar';
          }
        }
      }
      setChars(userChars);
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
    <li ref={ref} className={(isCurrentWord) ? 'currentWord' : 'default'}>
      {chars.map(x => renderChar(x.key, x.char, x.style),
      )}
    </li>

  );
};

export default Word;
