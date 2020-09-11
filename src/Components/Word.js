import React, { Component } from 'react';
import Char from './Char';

import '../css/word.css';

//PROPS
// FROM APP currentInput
// FROM WORDLIST isCurrentWord & word

class Word extends Component {
    
    render(){   
        return (
            <li className={(this.props.isCurrentWord) ? "currentWord":"default"}>
                { this.props.word }
            </li>
        )
    }
}

export default Word;

/*charWriter(str) {

        
        let userInput = this.props.currentInput.substr(1)
        let chars = [];
        if(this.props.word.length <= userInput.length)
        {
            for (let i = 0; i < str.length; i++) {
                chars.push(<span>{str.charAt(i)}</span>)
              }
        }
        if(this.props.word.length > userInput.length) {
            for (let i = 0; i < str.length; i++) {
                chars.push(<span>{str.charAt(i)}</span>)
              }
        }
        return chars;
    }
    */