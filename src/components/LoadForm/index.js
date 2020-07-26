import React, { Component } from 'react';
import { ButtonGroup, Button, Grid } from '@material-ui/core/';
import { LOAD_TYPES, LOAD_STATUS, VGDT_USERS } from '../../constants';
import { LoadContext } from '../../contexts/LoadContext';
import { ModalContext } from '../../contexts/ModalContext';
import LoadFormUI from './LoadFormUI';



class LoadForm extends Component {
  render() {
    return (
      <LoadContext.Consumer>{(context) => {
        const { load, save, deleteLoad } = context;
        return (
            <ModalContext.Consumer>{(context) => {
              const { toggleModal } = context;
              const handleDelete = (id) => {
                deleteLoad(id);
                toggleModal(false);
              }
              const handleSave = (load) => {
                save(load);
                toggleModal(false);
              }
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
                        <Button onClick={() => handleSave(load)}>Save</Button>
                        <Button onClick={() => toggleModal(false)}>Cancel</Button>
                        {load && load.id ?<Button onClick={() => handleDelete(load.id)}>Delete</Button>: ''}
                      </ButtonGroup>

                    </Grid>
                  </Grid>
                </React.Fragment>
                )
              }
            }
              </ModalContext.Consumer>
        )
      }}
      </LoadContext.Consumer>
    );
  }
}

export default LoadForm;
