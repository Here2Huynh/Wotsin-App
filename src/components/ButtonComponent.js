import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme =>  ({
    button: {
        margin: 10,
    },
});

function ButtonComponent(props) {
    const { classes,variant,color,onClick,label  } = props;
    
    return (
        <div>
            <Button 
                variant={variant}
                color={color}
                className={classes.button}
                onClick={onClick}
            >
                {label}
            </Button>
        </div>
    );
}

ButtonComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonComponent);