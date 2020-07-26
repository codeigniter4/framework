import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Select, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core';
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

            <Grid item xs={3}>
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

            <Grid item xs={3}>
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

            <Grid item xs={3}>
              <FormControl className={classes.formControl}>
                <InputLabel>Broker</InputLabel>
                <Select
                  native
                  value={load.brokerId}
                  onChange={updateLoad}
                  inputProps={{
                    name: 'brokerId',
                    id: 'load-broker',
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

              <Grid item xs={3}>
                <FormControl className={classes.formControl}>
                  <InputLabel>User</InputLabel>
                  <Select
                    native
                    value={load.user}
                    onChange={updateLoad}
                    inputProps={{
                      name: 'userId',
                      id: 'load-user',
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

            <Grid item xs={6}>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  id="pickupLocation"
                  label="Pickup Location"
                  name="pickupLocation"
                  value={load.pickupLocation}
                  onChange={updateLoad}
                  multiline
                />
              </FormControl>
            </Grid>


            <Grid item xs={6}>
              <DateTimePicker
                onChange={updateLoad}
                label="Pick Up"
                date={load.pickupDate}
                name="pickupDate"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth className={classes.margin}>
                <TextField
                  id="dropoffLocation"
                  label="Drop off Location"
                  name="dropoffLocation"
                  value={load.dropoffLocation}
                  onChange={updateLoad}
                  multiline
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <DateTimePicker
                onChange={updateLoad}
                label="Drop Off"
                date={load.dropoffDate}
                name="dropoffDate"
              />
            </Grid>


            <Grid item xs={12}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="rate"
                  value={load.rate}
                  onChange={updateLoad}
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
              </FormControl>
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
