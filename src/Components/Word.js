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
            charIndex: characterIndex, //unique index number tracker for Char components
            chars: charList //list of chars for each word
        }   
    }
    //pretty sure you'll need a state to keep
    // track of unique keys for ind chars

    renderChar(key, char, style) {
//PROPS
// FROM APP currentInput, currentWordNum
// FROM WORDLIST isCurrentWord & word

        this.styleSetter()

        return (
            <Char
                key = { key }
                style = { style }
                char = { char }
            />
        )
    }

    styleSetter(){
        let characters = this.state.chars;
        let userInput = this.props.currentInput
        userInput = userInput.substr(1);
        //console.log(userInput.slice(0,-1))
        console.log(characters[userInput.length].char)
        /*
        if(userInput.slice(0,-1)===''){
            return "default"
        }
    
        if(userInput.slice(0,-1) === this.props.word[userInput.length]){
            return "correctChar"
        }
        if(userInput.slice(0,-1) !== this.props.word[userInput.length]){
            return "incorrectChar"
        }
        else{
            return "default"
        }
        */
    }


    

    render(){
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





  charStyle(){
        let userInput = this.props.currentInput
        userInput = userInput.substr(1);

        console.log()
        if(userInput.slice(0,-1)===''){
            return "default"
        }
    
        if(userInput.slice(0,-1) === this.props.word[userInput.length]){
            return "correctChar"
        }
        if(userInput.slice(0,-1) !== this.props.word[userInput.length]){
            return "incorrectChar"
        }
        else{
            return "default"
        }
        }
    */