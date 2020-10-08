import React from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = ({ userInputWords, currentWordNum, testWords, resetTestWords: resetTestState }) => {
    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key={key}
                word={word}
                isCurrentWord={isCurrent}
                currentWordNum={currentWordNum}
                resetTestState={resetTestState}
                userInputWords={userInputWords}
            />
        )
    }

    return (
        <div className="wordList">
            { testWords.map((x, index) =>
                renderWord(index, x, (index === currentWordNum) ? true : false))}
        </div>
    );
}

export default WordList;