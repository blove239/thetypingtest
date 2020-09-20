import React from 'react';
import '../css/char.css';

const Char = (props) => {
        return (
            <span className={props.class}>{props.char}</span>
        )
}
export default Char;