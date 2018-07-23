import React, { Component } from 'react';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import SpeechButtonContainer from './SpeechButtonContainer';
import OutputTextComponent from '../OutputTextComponent';
import Title from '../Title';


class SpeechToTextContainer extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            listenStop: false,
          }
    }
    
    onListenClick = () => {
        this.setState({
          listenStop: false
        })

        fetch('http://localhost:3002/api/speech-to-text/token')
          .then(function(response) {
              return response.text();
          })
          .then((token) => {
            console.log(token)
            var stream = recognizeMic({
                token: token,
                objectMode: true, // send objects instead of text
                extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
                format: false // optional - performs basic formatting on the results such as capitals an periods
            });
    
            console.log(stream)
            stream.on('data', (data) => {
              console.log(data);
              console.log(this.state.listenStop)
              if (this.state.listenStop) {
                console.log('stop listening')
                stream.stop()
              }
              else {
                this.setState({
                  text: data.alternatives[0].transcript
                }) 
              }
            });
    
            stream.on('error', function(err) {
                console.log(err);
            });
            // document.querySelector('#stop').onclick = stream.stop.bind(stream);
          }).catch(function(error) {
              console.log(error);
          });
      };
    
      onStopClick = () => {
        this.setState({
          listenStop: true
        })
      }

    render() {
        const { text } = this.state;
        const title = 'Speech to Text'
        return (
            <div>
                <Title title={title} /> 
                <SpeechButtonContainer
                    onListenClick={this.onListenClick}
                    onStopClick={this.onStopClick}
                />
                <OutputTextComponent output={text} />
            </div>
        );
    }

}

export default SpeechToTextContainer;
