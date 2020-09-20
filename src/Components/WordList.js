import React from 'react';
import Word from './Word';
import '../css/wordlist.css';

const WordList = (props) => {
// PROPS FROM APP
// this.props.userInput (string for representing users current input)
// this.props.currentWord (int for which word user is on)
    const wordStyle = (i) => {
    if(i === props.currentWordNum) {
        return true;
        }
    else {
        return false;
        }
    }

    const renderWord = (key, word, isCurrent) => {
        return (
            <Word
                key = { key }
                listId = { key }
                word = { word }
                currentInput = { props.currentInput }
                isCurrentWord = { isCurrent }
                currentWordNum = { props.currentWordNum }
                currentCharNum = { props.currentCharNum }
                testWords = { props.testWords }
            />
        )
    }

    return (
        <div className="wordGen">
            { props.testWords.map( (x, index) =>
             renderWord(index + 1, x, wordStyle(index)) ) }
        </div>
        );
}

export default WordList;