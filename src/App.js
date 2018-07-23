import React, { Component } from 'react';
import './App.css';
import SpeechToTextContainer from './components/containers/SpeechToTextContainer';
import TextToSpeechContainer from './components/containers/TextToSpeechContainer';


class App extends Component {
  
  render() {
    return (
      <div className="App">
        <SpeechToTextContainer /> 
        <TextToSpeechContainer /> 
      </div>
    );
  }
}

export default App;
