import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      flexGrow: 1,
      maxWidth: 600,
      margin: 'auto',
      padding: 10,
    },
  };

function Title(props) {
    const { classes, title } = props;

    return (
        <div className={classes.root}>
            <Typography variant="display2" color="inherit">
                {title}
            </Typography>
    </div>
    );
}

Title.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Title);