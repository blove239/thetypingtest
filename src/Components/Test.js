import React, { useEffect, useRef } from 'react';
import '../css/test.css';


const Test = (props) => {
  const onInputChange = (e) => {
    props.onChange(e);
  }
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
 
  return (
    <div style={{ margin: '20px 0 20px 20px' }}>
      <hr />
      <input ref={inputRef}
        type="text"
        value={props.inputVal}
        onChange={onInputChange}
        style={{ margin: '0 10px' }} />
    </div>
  );

}
export default Test;