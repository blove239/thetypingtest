import React, { Component } from 'react';
//import '../css/words.css';



class Word extends Component {
    render(){
        return (
            <li>{this.props.value}</li>
        )
    }
}

export default Word;