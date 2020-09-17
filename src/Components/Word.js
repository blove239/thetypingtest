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

/*
  charStyle() {
        //remove leading ' ' from beginning of userInput
        let userInput = this.props.currentInput.substr(1);
       // console.log(userInput.length);
        let wordChars = this.state.chars;
        if(this.props.isCurrentWord) {
            if(userInput ===''){
                wordChars[userInput.length] = {char:wordChars[userInput.length].chars,
                style:"default",
                key:wordChars[userInput.length].key}
              //  this.setState({ chars:wordChars })
                console.log("empty")
            }
        
            else if(userInput.slice(-1) === this.props.word[userInput.length-1]){
                console.log("correctChar") 
            }
            else if(userInput.slice(-1) !== this.props.word[userInput.length-1]){
                console.log("incorrectChar")
            }
            else{
                console.log("default") 
            }
        }
    }
    */