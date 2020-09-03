import React, { Component } from 'react';
import Word from './Word';
import '../css/wordlist.css';

const randomWords = require('random-words');
let testWords = randomWords({ exactly:250 });

class WordList extends Component {
    constructor(props) {
        super(props);

        this.state = {wordList: []};
    }

    renderWord(i) {
        return (
            <Word
                value={i}
            />
        )
    }
  
    render() {
        return (
        <div className="wordGen">
            {testWords.map(x => this.renderWord(x))}   
        </div>
        );
      }
}

export default WordList;