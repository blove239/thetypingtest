import React from 'react';
import '../css/test.css';


const Test =(props) => {
  // handle input change event
  const onInputChange = (e) => {
      props.onChange(e);
    }
  
 
  // prevent submit
  /*
  const hanldeSubmit = (e) => {
      e.preventDefault();
    }
*/
    return (
      <div style={{ margin: '20px 0 20px 20px' }}>
        <hr />
        <input type="text" 
        value = { props.inputVal }
        onChange = { onInputChange }
        style = {{ margin: '0 10px' }} />
      </div>
    );
  
}
export default Test;