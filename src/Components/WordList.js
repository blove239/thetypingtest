import React, { Component } from 'react';
import Word from './Word';
import '../css/wordlist.css';

class WordList extends Component {
    constructor(props) {
        super(props);
        const randomWords = require('random-words');
        let testWords = randomWords({ exactly: 250 }).map((x) => {
            return ({word:x,
                isCurrentWord: false})
             });
        testWords[0] = {word:testWords[0].word,isCurrentWord:true}
        
        this.state = { wordList: testWords }   
    }

// PROPS FROM APP
// this.props.userInput (string for representing users current input)
// this.props.currentWord (int for which word user is on)

    renderWord(key, word, isCurrent) {
        return (
            <Word
                key = { key }
                word = { word }
                currentInput = { this.props.currentInput }
                isCurrentWord = { isCurrent }
            />
        )
    }

    render() {
        return (
        <div className="wordGen">
            { this.state.wordList.map((x, index) =>
             this.renderWord(index,x.word, x.isCurrentWord)) }
        </div>
        );
      }
}

export default WordList;