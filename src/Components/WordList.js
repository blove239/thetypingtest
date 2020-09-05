import React, { Component } from 'react';
import Word from './Word';
import '../css/wordlist.css';

const randomWords = require('random-words');
let testWords = randomWords({ exactly:250 });

class WordList extends Component {
    constructor(props) {
        super(props);
        this.state = {wordList: testWords.map((x, index) => this.renderWord(index,x))};
    }

// PROPS FROM APP
// this.props.userInput
// this.props.currentWord

    renderWord(key, i) {
        return (
            <Word
                key = { key }
                word = { i }
            />
        )
    }

    currentWordList = () => {
        let currentWord = this.state.wordList[this.props.currentWord].state.word
        this.props.currentWord(currentWord);
    }

    render() {
        return (
        <div className="wordGen">
            { this.state.wordList }
            currentWord = { this.currentWordList }
        </div>
        );
      }
}

export default WordList;