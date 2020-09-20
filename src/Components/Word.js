import React, { useState } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = (props) => {
    let characterIndex = parseInt(props.listId.toString().concat("00"));
    let charList = [];
    for(let i = 0; i < props.word.length; i++) {
        charList.push({ 
            char:props.word[i],
            style:"default",
            key: characterIndex });
        characterIndex += 1;
    }
    const [chars, setChars] = useState(charList);


//PROPS
// FROM APP currentInput, currentWordNum
// FROM WORDLIST listId, word, currentInput, isCurrentWord, currentWordNum, currentCharNum

    const renderChar = (key, char,index) => {
        let style = "default";
        let trimmedInput = props.currentInput.substr(1);
        if(props.isCurrentWord){
            if(props.currentCharNum === index){
            for(let i = 0;i<trimmedInput.length;i++){
                (chars[i].char === trimmedInput[i]) ? (style = "correctChar") : (style = "incorrectChar")
                }
            }
            }
            
        
            
        return (
            <Char
                key   = { key }
                class = { style }
                char  = { char }
            />
        )
    }

        return (
            <li className={(props.isCurrentWord) ? "currentWord":"default"}>
                {chars.map((x,index) => 
                    renderChar(x.key, x.char,index)
                )}
            </li>
        
        )
    
}

export default Word;