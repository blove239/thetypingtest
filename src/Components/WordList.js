import React, { useState, useEffect } from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = ({ currentInput, currentCharNum, currentWordNum, testWords, resetTestWords }) => {
    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key={key}
                word={word}
                currentInput={currentInput}
                isCurrentWord={isCurrent}
                currentWordNum={currentWordNum}
                resetTestWords={resetTestWords}
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