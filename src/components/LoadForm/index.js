import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_MODEL } from './Model';
import { LoadContext } from '../../contexts/LoadContext';


function LoadForm(props) {
  const [ newLoad, setLoad ] = useState(LOAD_MODEL);
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
    <LoadContext.Consumer>{(context) => {
      const { load, save, deleteLoad } = context;
      const loadToSave = load && load.id ? load : newLoad;
      return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <p>LoadForm</p>
            <Button onClick={() => save(loadToSave)}>Save</Button>
            {load && load.id ? <Button onClick={() => deleteLoad(load.id)}>Delete</Button> : ''}
          </Paper>
        </React.Fragment>
      )
    }}
    </LoadContext.Consumer>
  );
}

LoadForm.propTypes = {};

export default LoadForm;
