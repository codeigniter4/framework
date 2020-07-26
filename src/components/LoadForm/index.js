import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_MODEL, LOAD_TYPES, LOAD_STATUS } from '../../constants';
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
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            >
              {load && load.id ?
                <LoadFormUI types={LOAD_TYPES} status={LOAD_STATUS}/>
              : ''}

              <Grid item xs={12}>
              <Button onClick={() => save(load)}>Save</Button>
              {load && load.id ? <Button onClick={() => deleteLoad(load.id)}>Delete</Button> : ''}
              </Grid>
            </Grid>
          </React.Fragment>
        )
      }}
      </LoadContext.Consumer>
    );
  }
}

export default LoadForm;
