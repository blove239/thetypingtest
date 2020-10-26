import React from 'react';
import '../css/title.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

const Title = () => {
    return (
        <div className='title'>
            <FontAwesomeIcon icon={faKeyboard}/> Typing{' '}
            <span className='page-title-bold'>Test</span>
        </div>
    );
};

export default Title;