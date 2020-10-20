import React, { useEffect } from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = ({ userInputWords, currentWordNum, testWords, resetTestWords: resetTestState, isTestActive }) => {
    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key={key}
                index={key}
                word={word}
                isCurrentWord={isCurrent}
                currentWordNum={currentWordNum}
                resetTestState={resetTestState}
                userInputWords={userInputWords}
                isTestActive={isTestActive}
            />
        )
    }

    return (
        <div className='wordlist-wrapper'>
            { testWords.map((word, index) =>
                renderWord(index, word, (index === currentWordNum) ? true : false))}
        </div>
    );
}

export default WordList;