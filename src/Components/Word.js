import React, { useState, useEffect, useRef } from 'react';
import Char from './Char';
import '../css/word.css';

const Word = (props) => {
    let characterIndex = parseInt(props.listId.toString().concat("00"));
    let charList = [];
    for(let i = 0; i < props.word.length; i++) {
        charList.push({ 
            char : props.word[i],
            style: "default",
            key  : characterIndex });
        characterIndex += 1;
    }
    const [chars, setChars] = useState(charList);

    useEffect(() => {
        let userChars        = chars;        
        if(props.isCurrentWord && props.currentInput.length-1<=chars.length){
            for(let i=0; i<chars.length; i++){
                if(props.currentInput.substr(1)[i] === undefined){
                    userChars[i].style        = "default"
                    }
                else if(userChars[i].char === props.currentInput.substr(1)[i]){
                    userChars[i].style        = "correctChar"
                } else {
                    userChars[i].style = "incorrectChar"
                    }
                }
            }
            setChars(userChars);
    },[chars, props.currentInput, props.isCurrentWord])

    const renderChar = (key, char, style) => {
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
                {chars.map((x, index) => 
                    renderChar(x.key, x.char,x.style)
                )}
            </li>
        
        )
    
}

export default Word;