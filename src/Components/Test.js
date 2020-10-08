import React, { useEffect, useRef } from 'react';
import '../css/test.css';


const Test = ({ onChange, inputVal, isTestDone, onKeyPress, typingArea }) => {
  const onInputChange = (e) => {
    onChange(e);
  }
  const inputRef = useRef(null);

  const onUserInput = (e) => {
    onKeyPress(e);
    
  }
  return (
    <div style={{ margin: '10px 0 10px 10px' }}>
      <hr />
      <input ref={inputRef}
        type='text'
        value={inputVal}
        onChange={onInputChange}
        className='input'
        disabled={isTestDone}
        onKeyPress={onUserInput}
        autofocus
      />
    </div>
  );

}
export default Test;