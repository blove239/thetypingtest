import React from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = ({ currentInput, currentCharNum, currentWordNum, testWords }) => {
    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key={key}
                listId={key}
                word={word}
                currentInput={currentInput}
                isCurrentWord={isCurrent}
                currentCharNum={currentCharNum}
            />
        )
    }

    return (
        <div className="wordGen">
            { testWords.map((x, index) =>
                renderWord(index + 1, x, (index === currentWordNum) ? true : false))}
        </div>
    );
}

export default WordList;