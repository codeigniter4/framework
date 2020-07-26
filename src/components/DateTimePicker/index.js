import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const handleDateChange = (date) => {
    const updateLoadData = {
      target: {
        name: props.name,
        value: date.toString()
      }
    }
    props.onChange(updateLoadData)

  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id={`${props.name}-date`}
          label={`${props.label} Date`}
          format="MM/dd/yyyy"
          value={new Date(props.date) || new Date()}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id={`${props.name}-time`}
          label={`${props.label} Time`}
          value={new Date(props.date) || new Date()}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
