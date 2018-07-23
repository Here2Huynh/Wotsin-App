import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonComponent from '../ButtonComponent';
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
      flexGrow: 1,
    }
};

function SpeechButtonContainer(props) {
    const { onListenClick, onStopClick } = props;
    const variant = 'contained';

    return (
        <div>
        <Grid container justify={'center'}>
            <Grid item >
                <ButtonComponent
                    variant={variant}
                    color={'primary'}
                    onClick={onListenClick}
                    label={'Start Listening'}
                />
            </Grid>
            <Grid item >
                <ButtonComponent
                    variant={variant}
                    color={'secondary'}
                    onClick={onStopClick}
                    label={'Stop Listening'}
                />
            </Grid>
        </Grid>
        </div>
    );
}

SpeechButtonContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpeechButtonContainer);