import React, { Component } from 'react';
import Word from './Word';
import '../css/wordlist.css';

class WordList extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
    }
// PROPS FROM APP
// this.props.userInput (string for representing users current input)
// this.props.currentWord (int for which word user is on)

    wordStyle(i){
    if(i === this.props.currentWordNum) {
        return true;
    }
    else {
        return false;
    }
    }

    charStyle(forward,correct,e){
        this.child.current.charStyle(forward,correct,e);
    }

    renderWord(key, word, isCurrent) {
        return (
            <Word
                key = { key }
                listId = { key }
                word = { word }
                currentInput = { this.props.currentInput }
                isCurrentWord = { isCurrent }
                currentWordNum = { this.props.currentWordNum }
                currentCharNum = { this.props.currentCharNum }
                testWords = { this.props.testWords }
                ref = {isCurrent ? this.child: undefined}
                    
                

                
            />
        )
    }

    render() {
        return (
        <div className="wordGen">
            { this.props.testWords.map( (x, index) =>
             this.renderWord(index + 1, x, this.wordStyle(index)) ) }
        </div>
        );
      }
}

export default WordList;