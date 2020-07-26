import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Select, FormControl, InputLabel } from '@material-ui/core';
import { LoadContext } from '../../../contexts/LoadContext';
import DateTimePicker from '../../DateTimePicker';

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
        <form className={classes.root} noValidate autoComplete="on">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="h6" component="h6">
              Load Form {load.id}
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                  native
                  value={load.type}
                  onChange={updateLoad}
                  inputProps={{
                    name: 'type',
                    id: 'load-type',
                  }}
                >
                  {props.types.map((item, index) => {
                    return (
                      <option key={index} value={item.type}>{item.alias}</option>
                    )
                  })}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel>Status</InputLabel>
                <Select
                  native
                  value={load.status}
                  onChange={updateLoad}
                  inputProps={{
                    name: 'status',
                    id: 'load-status',
                  }}
                >
                  {props.status.map((item, index) => {
                    return (
                      <option key={index} value={item.type}>{item.label}</option>
                    )
                  })}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={4}>
              <DateTimePicker
                onChange={updateLoad}
                label="Pick Up"
                date={load.pickupDate}
                name="pickupDate"
              />
            </Grid>

            <Grid item xs={4}>
              <DateTimePicker
                onChange={updateLoad}
                label="Drop Off"
                date={load.dropoffDate}
                name="dropoffDate"
              />
            </Grid>

          </Grid>
        </form>
      )
    }}
    </LoadContext.Consumer>
  );
}

LoadFormUI.propTypes = {};

export default LoadFormUI;
