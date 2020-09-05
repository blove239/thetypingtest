import React, { Component } from 'react';
import '../css/test.css';


class Test extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.hanldeSubmit = this.hanldeSubmit.bind(this);
  }
  
  // handle input change event
  onInputChange(e){
    this.props.onChange(e);
  }
  
 
  // prevent submit
  hanldeSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div style={{ margin: '20px 0 20px 20px' }}>
        <hr />
        <input type="text" 
        value = { this.props.inputVal }
        onChange = { this.onInputChange }
        style = {{ margin: '0 10px' }} />
      </div>
    );
  }
}
export default Test;