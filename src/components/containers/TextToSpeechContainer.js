import React, { Component } from 'react';
import Title from '../Title';
import TextField from '../TextField';
import ButtonComponent from '../ButtonComponent';
import WatsonSpeech from 'watson-speech/text-to-speech/synthesize';


class TextToSpeechContainer extends Component {
    constructor(){
        super();
        this.state = {
            inputFieldValue: ""
        };

        this.handleChange.bind(this);
        this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            inputFieldValue: event.target.value
        })
        // console.log(1)
    }

    handleSubmit = () => {
        let textToSynthesize = this.state.inputFieldValue;
        fetch('http://localhost:3002/api/text-to-speech/token')
            .then(function(response) {
                return response.text();
            })
            .then(function (token) {
    
            WatsonSpeech(
                {
                    text: textToSynthesize,
                    token: token
                })
        }).catch('error', err => {
            console.log('audio error: ', err);
        });;
    }



    render() {
        const title = 'Text to Speech'
        // const { inputFieldValue } = this.state; 
        const variant = 'contained';
        
        return (
            <div>
                <Title title={title} />
                <form>
                <TextField 
                    value={this.state.inputFieldValue}
                    handleInputFieldChange={this.handleChange} 
                />
                <ButtonComponent
                    variant={variant}
                    color={'primary'}
                    label={'Synthesize Text'}
                    type='submit'
                    onClick={this.handleSubmit}
                />
                </form>
                {/* <div>{console.log(inputFieldValue)}</div> */}
            </div>
        );
    }
}

export default TextToSpeechContainer;


