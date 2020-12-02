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

  const getWeeks = (rows) => rows.reduce((weeks, row) => {
    // console.log('tractors: ', row);
    const week = getWeek(row.dropoffDate);
    const rows = weeks[week] && weeks[week].rows || [];
    const weeksRateToDate = weeks[week] ? parseInt(weeks[week].rate) + parseInt(row.rate) : row.rate;
    const driverWeekPayToDate = (weeksRateToDate * row.driverRate).toFixed(2);
    const weekyDetentionPayToDate = weeks[week] ? parseInt(weeks[week].detentionPay) + parseInt(row.detentionPay) : row.detentionPay;
    rows.push(row);
    return {
      ...weeks,
      [week]: {
        rate: weeksRateToDate,
        driverPay: `$${driverWeekPayToDate}`,
        driverName: row.driverName,
        driverRate: `${row.driverRate * 100}%`,
        detentionPay: `${weekyDetentionPayToDate}`,
        layoverPay: `$${row.layoverPay}`,
        rows: [...rows]
      }
    }
  }, {})

  const tractors = rows && rows.length && rows.reduce((units, row) => {
    const tractor = row.tractor;
    const tractors = units[tractor] && units[tractor].rows || []
    // const unitNum = row.unit_num ? row.unit_num : units[tractor].unitNum;
    tractors.push(row);
    return {
      ...units,
      [tractor]: {
        unitNum: row.unit_num,
        rows: [...tractors]
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
      {tractors && rows && rows.length ?
        Object.keys(tractors).reverse().map((truck, i) => {
          const weeks = getWeeks(tractors[truck].rows);
          // console.log('weeks: ', weeks);
          return Object.keys(weeks).reverse().map((week, idx) => {
            return (
              <Grid item xs={12} key={idx} id={week}>
              {weeks[week] ?
                <React.Fragment>
                  Week {week} - Truck Number: {tractors[truck].unitNum} | Weekly Total: ${weeks[week].rate}.00 | Pay: {weeks[week].driverName} @ {weeks[week].driverRate} = {weeks[week].driverPay}
                  {weeks[week].detentionPay !== '0' ? ` | Detention Pay = $${weeks[week].detentionPay}.00` : ''}
                </React.Fragment> : ""}
              {
                weeks[week].rows.map((row, indx) => {
                return (
                    <Grid item xs={12} key={indx} id={row.id}>
                      <LoadCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
                    </Grid>
                  )
                })
              }
              </Grid>
            )
          })
        })
       : ''}

     </Grid>
    </React.Fragment>
  )
}
