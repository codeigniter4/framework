import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DriverSelect(props) {
  const classes = useStyles();
  const { actions } = props;
  const { filterByDriver, getDriver, getDrivers } = actions;
  const driver = getDriver();
  const drivers = getDrivers();
  const handleChange = (event) => {
    filterByDriver(event.target.value);
  };


  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Driver</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          value={driver}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {drivers && drivers.length ?
            drivers.map((dvr, index) => {
              const name = `${dvr.firstname} ${dvr.lastname}`
              return (<MenuItem key={index} value={name}>{name}</MenuItem>)
            }) : ""
          }

        </Select>
      </FormControl>
    </div>
  );
}
