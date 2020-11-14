import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListToolBar from '../ListToolBar';
import EnhancedTableToolbar from '../ListActionBar';
import LoadCard from '../CardView/LoadCard';

export default function GroupByDateCard(props) {
  const { rows, actions, table } = props;
  const isMobile = useMediaQuery('(max-width:1023px)');
  const [ selected, setSelected ] = React.useState([]);
  const [ week, setWeek ] = React.useState({});
  const handleSelected = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  // console.log('GroupByDateCard: ', rows);



  // Returns the ISO week of the date.
  const getWeek = (date) => {
    var date = new Date(date);
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 1 - (date.getDay() + 4) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 2);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    var theWeek = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
    return  theWeek;
  }

  const weeks = rows && rows.length && rows.reduce((weeks, row) => {
    const week = getWeek(row.dropoffDate);
    const rows = weeks[week] && weeks[week].rows || [];
    const weeksRateToDate = weeks[week] ? parseInt(weeks[week].rate) + parseInt(row.rate) : row.rate;
    rows.push(row);
    return {
      ...weeks,
      [week]: {
        rate: weeksRateToDate,
        rows: [...rows]
      }
    }
  }, {})



  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
            <EnhancedTableToolbar numSelected={selected.length} {...actions} selected={selected} setSelected={setSelected}/>
        </Grid>
      {rows && rows.length ?
        Object.keys(weeks).reverse().map((week, idx) => {
          return (
            <Grid item xs={12} key={idx}>
            Week {week} - Weekly Total: ${weeks[week].rate}.00
            {
              weeks[week].rows.map((row, indx) => {
              return (
                  <Grid item xs={12} key={indx}>
                    <LoadCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
                  </Grid>
                )
              })
            }
            </Grid>
          )
        })
       : ''}

     </Grid>
    </React.Fragment>
  )
}
