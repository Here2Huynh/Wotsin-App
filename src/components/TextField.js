import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',

    },
    input: {
      margin: 'auto',
      
    },
  });

    function TextField(props) {

        const { classes,inputFieldValue,handleInputFieldChange } = props;
        
        return(
            <div className={classes.container}>
                <Input 
                    className={classes.input}
                    multiline
                    inputProps={{
                        'aria-label': 'Description',
                    }}
                    value={inputFieldValue} 
                    onChange={handleInputFieldChange}
                    placeholder="Type in something"
                />
            </div>
        );
    }    


  TextField.propTypes = {
      classes: PropTypes.object.isRequired,
  }

  export default withStyles(styles)(TextField);