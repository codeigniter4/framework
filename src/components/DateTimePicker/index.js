import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  const { date, label, name } = props;
  const [selectedDate, setSelectedDate] = useState(new Date(date));
  const handleDateChange = (date) => {
    const updateLoadData = {
      target: {
        name: props.name,
        value: date.toString()
      }
    }
    setSelectedDate(date)
    props.onChange(updateLoadData)

  };



  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id={`${name}-date`}
          label={`${label} Date`}
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          fullWidth
        />
        <KeyboardTimePicker
          margin="normal"
          id={`${props.name}-time`}
          label={`${props.label} Time`}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          fullWidth
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
