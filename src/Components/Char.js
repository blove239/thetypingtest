import React, { Component } from 'react';

class Char extends Component {
    render() {
        return (
            <span className={this.props.isCorrect}>
                {this.props.char}
            </span>
        )
    }
}
export default Char;