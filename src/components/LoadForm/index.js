import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, ButtonGroup, Button, Grid } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_MODEL, LOAD_TYPES, LOAD_STATUS, VGDT_USERS } from '../../constants';
import { LoadContext } from '../../contexts/LoadContext';
import LoadFormUI from './LoadFormUI';



class LoadForm extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <LoadContext.Consumer>{(context) => {
        const { load, save, deleteLoad, toggleModal } = context;
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
                <LoadFormUI types={LOAD_TYPES} status={LOAD_STATUS} users={VGDT_USERS}/>
              : ''}

              <Grid item xs={12} align="right">

                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                  <Button onClick={() => save(load)}>Save</Button>
                  <Button onClick={() => toggleModal(false)}>Cancel</Button>
                  {load && load.id ?<Button onClick={() => deleteLoad(load.id)}>Delete</Button>: ''}
                </ButtonGroup>

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
