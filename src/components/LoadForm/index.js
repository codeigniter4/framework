import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';


function LoadForm(props) {
  const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  })
);
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      LoadForm
    </div>
  );
}

LoadForm.propTypes = {};

export default LoadForm;
