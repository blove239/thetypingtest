import React, { Component } from 'react';
import './App.css';
import Test from './Components/Test';
import WordList from './Components/WordList';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentInput: 'HELLO'
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e){
    this.setState({currentInput:e.target.value})
  }


  render() {
    return (
      <div style={{ width: 500, margin: 50 }}>
        <WordList/>
        <Test inputVal={this.state.currentInput}
        onChange={this.onInputChange}
        />
      </div>
    );
  }
}

export default App;