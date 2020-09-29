import React, { useEffect, useRef } from 'react';
import '../css/test.css';


const Test = ({ onChange, inputVal, isTestDone }) => {
  const onInputChange = (e) => {
    onChange(e);
  }
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ margin: '10px 0 10px 10px' }}>
      <hr />
      <input ref={inputRef}
        type='text'
        value={inputVal}
        onChange={onInputChange}
        className='input'
        disabled={isTestDone}
      />
    </div>
  );

}
export default Test;