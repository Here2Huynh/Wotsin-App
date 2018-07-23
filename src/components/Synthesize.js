import React, { Component } from 'react';
import ButtonComponent from './ButtonComponent';
import WatsonSpeech from 'watson-speech/text-to-speech/synthesize';

class Synthesize extends Component {
    constructor(props) {
        super(props);
    }

    handleButtonClick = (textToSynthesize) => {
        console.log(textToSynthesize)
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
        const { textToSynthesize } = this.props;
        const variant = 'contained';

        return (
            
            <div>
                <ButtonComponent
                    variant={variant}
                    color={'primary'}
                    onSubmit={this.handleButtonClick(textToSynthesize)}
                    label={'Synthesize Text'}
                />
                <div>{console.log(textToSynthesize)}</div>
            </div>
        );
    }

}

export default Synthesize;