import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import { LoadContext } from '../../../contexts/LoadContext';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function LoadFormUI(props) {
  const classes = useStyles();


  return (
    <LoadContext.Consumer>{(context) => {
      const { load, updateLoad} = context;
      return (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h6">
            Load Form {load.id}
            </Typography>
          </Grid>


          <form className={classes.root} noValidate autoComplete="off">
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Load Type</InputLabel>
                <Select
                  native
                  value={load.type}
                  onChange={updateLoad}
                  inputProps={{
                    name: 'type',
                    id: 'load-type',
                  }}
                >
                  <option aria-label="None" value="" />
                  {props.types.map((item, index) => {
                    return (
                      <option key={index} value={item.type}>{item.label}</option>
                    )
                  })}
                </Select>
              </FormControl>

              </Grid>
              <Grid item xs={12}>
                <TextField required id="standard-required" label="Required" defaultValue="Hello World" />
              </Grid>
            </form>

        </Grid>
      )
    }}
    </LoadContext.Consumer>
  );
}

LoadFormUI.propTypes = {};

export default LoadFormUI;
