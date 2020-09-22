import React from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = (props) => {
// PROPS FROM APP
// this.props.userInput (string for representing users current input)
// this.props.currentWord (int for which word user is on)

    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key = { key }
                listId = { key }
                word = { word }
                currentInput = { props.currentInput }
                isCurrentWord = { isCurrent }
                currentCharNum = { props.currentCharNum }
            />
        )
    }

    return (
        <div className="wordGen">
            { props.testWords.map( (x, index) =>
             renderWord(index + 1, x, (index === props.currentWordNum) ? true : false) ) }
        </div>
        );
}

export default WordList;