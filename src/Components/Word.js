import React, { Component } from 'react';
import Char from './Char';
import '../css/word.css';

class Word extends Component {
    constructor(props) {
        super(props);
        let characterIndex = parseInt(this.props.listId.toString().concat("00"));
        let charList = [];
        for(let i = 0; i < this.props.word.length; i++) {
            charList.push({ 
                char:this.props.word[i],
                style:"default",
                key: characterIndex });
            characterIndex += 1;
        }
        this.state = {
            chars: charList //list of chars for each word
        }
    }
//PROPS
// FROM APP currentInput, currentWordNum
// FROM WORDLIST listId, word, currentInput, isCurrentWord, currentWordNum, currentCharNum


    charStyle(forward,correct,e) {
        //remove leading ' ' from beginning of userInput
        let userInput = this.props.currentInput.substr(1);
        let wordChars = this.state.chars;
        if(forward && correct){
            this.charAdder("correctChar",e)
        } 
        else if (forward && !correct){
            this.charAdder("incorrectChar",e)
        }
        else {
            this.charRemover(e);
        }
    }

    charAdder(style, e){
        let wordChars = this.state.chars;
        //remove first char
        let currentInput = e.target.value.substr(1)
        // if current word's chars are less than the userinput
        // add a new char to the word's chars
        if(this.state.chars.length <= this.props.currentCharNum) {
            wordChars.push({
                char:e.target.value.substr(-1),
                style:"incorrectChar",
                key: wordChars[this.props.currentCharNum-2].key + 2
            })
            this.setState({chars:wordChars})
        } else {
        wordChars[this.props.currentCharNum].style = style;
        this.setState({chars:wordChars})
        }
    }

    charRemover(e) {
        console.log("THE MASTER DELETE")
        let wordChars = this.state.chars;
        let wordLengthDiff = e.target.value.length
        if(this.props.testWords[this.props.currentWordNum].length < this.props.currentCharNum) {
            wordChars.splice(-1,1);
            this.setState({chars:wordChars})
        }
        else {

        }
    }


    renderChar(key, char, style) {
        return (
            <Char
                key = { key }
                style = { style }
                char = { char }
            />
        )
    }

    render() {
        return (
            <li className={(this.props.isCurrentWord) ? "currentWord":"default"}>
                {this.state.chars.map((x) =>
                    this.renderChar(x.key, x.char, x.style)
                )}
            </li>
        
        )
    }
}

export default Word;