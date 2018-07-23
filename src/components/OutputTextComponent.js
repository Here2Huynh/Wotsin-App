import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      maxWidth: 600,
      margin: 'auto',
      fontSize: 20,
    },
  });


function OutputTextComponent(props) {
    const { classes, output } = props;

    return (
        <div> 
            <Paper className={classes.root} elevation={1}>
                <Typography variant="headline" component="h3">
                    Output:
                </Typography>
                <Typography variant="display1" component="p">
                    {output}
                </Typography>
             </Paper>
        </div>
    );
}

OutputTextComponent.propTypes = {
    classes: PropTypes.object.isRequired,
}; 

export default withStyles(styles)(OutputTextComponent);
