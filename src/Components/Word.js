import React, { Component } from 'react';
//import '../css/words.css';



class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCurrentWord: false,
           // userInput: this.props.userInput // this should be just handed down as prop,
           // which word component can then modify style based off
        };
    }
    render(){
        return (
            <li>{ this.props.word }</li>
        )
    }
}

export default Word;