import React from 'react';
import '../css/char.css';

const Char = ({ style, char }) => {
    return (
        <span className={style}>{char}</span>
    )
}
export default Char;