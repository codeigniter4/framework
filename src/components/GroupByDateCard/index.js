import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListToolBar from '../ListToolBar';
import EnhancedTableToolbar from '../ListActionBar';
import WeeklyCard from '../CardView/WeeklyCard';
import { getWeek } from '../../utils/getWeeks';
import { getMomentWeeks } from '../../utils/dates';

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




  const getWeeklyTotals = (data, key) => {
    const results = data[key].reduce((total, record) => {
      const weeksRateToDate = total.rate ? parseInt(record.rate) + parseInt(total.rate) : parseInt(record.rate);
      const driverWeekPayToDate = (weeksRateToDate * record.driverRate).toFixed(2);
      const weekyDetentionPayToDate = total.detentionPay ? parseInt(record.detentionPay) + parseInt(total.detentionPay) : record.detentionPay;
      const weeklyloadedMiles = total.loadedMiles ? parseInt(record.loadedMiles) + parseInt(total.loadedMiles) : record.loadedMiles;
      const weeklyDeadheadMiles = total.deadHead ? parseInt(record.deadHead) + parseInt(total.deadHead) : record.deadHead;
      return {
        ...total,
        rate: weeksRateToDate,
        driverPay: `$${driverWeekPayToDate}`,
        driverName: record.driverName,
        driverRate: `${record.driverRate * 100}%`,
        detentionPay: `${weekyDetentionPayToDate}`,
        layoverPay: record.layoverPay,
        week: key,
        loadedMiles: weeklyloadedMiles,
        deadHead: weeklyDeadheadMiles
      }
    }, {});
    return results;
  }

  const getCards = (rows) => {
    const weeks = getMomentWeeks(rows, 'dropoffDate');
    return Object.keys(weeks).map((week, idx) => {
      const totals = getWeeklyTotals(weeks, week)
      return (
        <Grid item xs={12} key={idx} id={week}>
        {weeks[week] && weeks[week].length ?
          <WeeklyCard key={idx} expand={idx} totals={totals} data={weeks[week]} week={week} isMobile={isMobile} selected={selected} handleSelected={handleSelected}/> : ""}
        </Grid>
      )
    })
  }




  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
            <EnhancedTableToolbar numSelected={selected.length} {...actions} selected={selected} setSelected={setSelected}/>
        </Grid>
        {//<Grid item xs={12}>Drivers</Grid>
        }
      {rows && rows.length ? getCards(rows) : ''}

     </Grid>
    </React.Fragment>
  )
}
