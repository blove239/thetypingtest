import React, { Component } from 'react';
import '../css/char.css';

class Char extends Component {

    render() {
        return (
            <span className={this.props.style}>{this.props.char}</span>
        )
    }
}
export default Char;