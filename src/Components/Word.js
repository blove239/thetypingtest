import React, { useState, useEffect } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = ({ word, listId, isCurrentWord, currentInput, currentCharNum }) => {
  let characterIndex = parseInt(listId.toString().concat('00'));
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

  useEffect(() => {
    if (isCurrentWord) {
      const userChars = JSON.parse(JSON.stringify(chars));
      console.log(`currentinput: ${currentInput.length - 1}`)
      if (currentInput.length - 1 > chars.length) {
        userChars.push({
          char: currentInput.slice(-1),
          style: "incorrectChar",
          key: userChars[userChars.length - 1].key + 1
        })
        console.log("add incorrect")
        console.log(currentInput.length - 1)
      } else if (currentInput.length - 1 > word.length) {
        console.log("pop")
        console.log(currentInput.length - 1);
        userChars.pop();
      } else if (currentInput.length - 1 <= word.length) {
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
        console.log("iterate through corrects")
        console.log(currentInput.length - 1);
      }
      setChars(userChars);
    }

  }, [currentInput])

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
    <li className={(isCurrentWord) ? 'currentWord' : 'default'}>
      {chars.map(x => renderChar(x.key, x.char, x.style),
      )}
    </li>

  );
};

export default Word;
