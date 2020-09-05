import React, { Component } from 'react';
import './App.css';
import Test from './Components/Test';
import WordList from './Components/WordList';


class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentInput: ' ',
      currentWord: 0,
      userInputWords: []
    }
    this.onInputChange = this.onInputChange.bind(this);
  }

  onDeletion(e){
    if(this.state.currentInput.length === 1) { //if user at start of a word
      if(this.state.userInputWords.length === 0) //block user from deleting if at first word
        { 
          this.setState({ currentInput: ' ' })
        }
      else // if user deleting at first character of a non first word
        {
        this.setState({           // return the previous word in inputWords, among other things
          userInputWords : this.state.userInputWords.slice(0, -1), //removes last item from list
          currentInput   : this.state.userInputWords.slice(-1)[0], // sets current input to previous typed word
          currentWord    : this.state.currentWord - 1
          });
        }
    } 
    else // if deletion of a character of current word
      {
      this.setState({ currentInput: e.target.value });
      }
}

  onSpacebar(){
    this.setState(prevState => ({
      userInputWords  : [...prevState.userInputWords, this.state.currentInput],
      currentWord: this.state.currentWord + 1,
      currentInput : ' '
    })
  )
  }

  charCheck(e){
    this.setState({ currentInput : e.target.value });

  }
  
  currentWord(x){
    
  }

  currentChar(){
    
  }


  onInputChange(e){
    if(e.target.value.length < this.state.currentInput.length) { // checks for deletion
      this.onDeletion(e);
    }

    else if(e.target.value.charAt(e.target.value.length-1) === ' '){ //spacebar detection
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
          userInput={ this.state.currentInput }
          wordList = { this.currentWord }
          currentWord = { this.wordList }
        />

        <Test 
          inputVal = { this.state.currentInput }
          onChange = { this.onInputChange }
        />
      </div>
    );
  }
}

export default App;