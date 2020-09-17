import React, { Component } from 'react';
import './App.css';
import Test from './Components/Test';
import WordList from './Components/WordList';


class App extends Component {
  constructor(props) {
    super();
    const randomWords = require('random-words');
    let testWords = randomWords({ exactly: 8 });
    this.state = {
      currentInput   : " ",
      currentWordNum : 0,
      currentCharNum : 0,
      userInputWords : [],
      testWords: testWords,
    }
    this.onInputChange = this.onInputChange.bind(this);
  
    this.child = React.createRef();
  }

  onDeletion(e){
    if(this.state.currentInput.length === 1) { //if user at start of a word
      if(this.state.userInputWords.length === 0) { //block user from deleting if at first word 
          this.setState({ currentInput: ' ' })
        }
      else { // if user deleting at first character of a non first word
        this.setState({           // return the previous word in inputWords, among other things
          userInputWords : this.state.userInputWords.slice(0, -1), //removes last item from list
          currentInput   : this.state.userInputWords.slice(-1)[0], // sets current input to previous typed word
          currentWordNum : this.state.currentWordNum - 1,
          currentCharNum : 0
          });
        this.child.current.charStyle(false,false,e);

        }
    } 
    else {// if deletion of a character of current word
      this.setState({
        currentInput   : e.target.value,
        currentCharNum : this.state.currentCharNum - 1
       });
       this.child.current.charStyle(false,false,e);

      }
}

  onSpacebar(){
    this.setState(prevState => ({
      userInputWords  : [...prevState.userInputWords, this.state.currentInput],
      currentWordNum  : this.state.currentWordNum + 1,
      currentInput    : ' ',
      currentCharNum  : 0
    })
  )
  }

  charCheck(e){
    this.setState({
      currentInput   : e.target.value,
      currentCharNum : this.state.currentCharNum + 1
    });
    if(this.currentTestChar(e) === this.currentUserChar(e)) {
      this.child.current.charStyle(true,true,e);
      console.log("correct");
    } else {
      this.child.current.charStyle(true,false,e);
      console.log("incorrect");
    }
    
  }
  
  currentTestChar(e) {
    let cCN = this.state.currentCharNum
    return this.state.testWords[this.state.currentWordNum].charAt(cCN);
  }

  currentUserChar(e) {
    return e.target.value.substr(1).slice(-1);
  }

  onInputChange(e){
    if(e.target.value.length < this.state.currentInput.length) { // checks for deletion
      this.onDeletion(e);
    }
    else if(e.target.value.charAt(e.target.value.length-1) === ' ') { //spacebar detection
      this.onSpacebar();
     }
    else { //if user typing a character
      this.charCheck(e);
    }
  }


  render() {
    return (
      <div style={{ width: 500, margin: 50 }}>
        <WordList 
          currentWordNum = { this.state.currentWordNum }
          currentCharNum = { this.state.currentCharNum }
          currentInput = { this.state.currentInput }
          testWords = { this.state.testWords }
          ref = { this.child }
        />

        <Test 
          inputVal = { this.state.currentInput }
          onChange = { this.onInputChange }
        />
      </div>
    );
  }
}

export default App 