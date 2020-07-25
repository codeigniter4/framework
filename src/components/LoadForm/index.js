import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_MODEL, LOAD_TYPES } from './Model';
import { LoadContext } from '../../contexts/LoadContext';
import LoadFormUI from './LoadFormUI';



class LoadForm extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <LoadContext.Consumer>{(context) => {
        const { load, save, deleteLoad } = context;
        return (
          <React.Fragment>
            <LoadFormUI types={LOAD_TYPES}/>
            <Button onClick={() => save(load)}>Save</Button>
            {load && load.id ? <Button onClick={() => deleteLoad(load.id)}>Delete</Button> : ''}
          </React.Fragment>
        )
      }}
      </LoadContext.Consumer>
    );
  }
}

export default LoadForm;
