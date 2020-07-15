import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  ListViewWrapper: {
    margin: '40px 16px',
  },
});

function ListView(props) {
  const { classes } = props;

  return (
      <div className={classes.ListViewWrapper}>
        <Typography color="textSecondary" align="center">
          No users for this project yet
        </Typography>
      </div>
  );
}

ListView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListView);
