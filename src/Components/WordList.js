import React, {useState, useEffect} from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = ({ currentInput, currentCharNum, currentWordNum }) => {
    const randomWords = require('random-words');
    const [testWords, setTestWords] = useState(randomWords({ exactly: 150 }));

 
    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key={key}
                word={word}
                currentInput={currentInput}
                isCurrentWord={isCurrent}
                currentWordNum={currentWordNum}
            />
        )
    }

    return (
        <div className="wordGen">
            { testWords.map((x, index) =>
                renderWord(index, x, (index === currentWordNum) ? true : false))}
        </div>
    );
}

export default WordList;