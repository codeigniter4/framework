import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import LoadCard from './LoadCard';
import UserCard from './UserCard';
import BrokerCard from './BrokerCard';
import InvoiceCard from './InvoiceCard';
import EmployeeCard from './EmployeeCard';
import EquipmentCard from './EquipmentCard';
import ListToolBar from '../ListToolBar';
import EnhancedTableToolbar from '../ListActionBar';
import { paperStylesTable } from '../../styles/paper';

const CardView = (props) => {
  const { rows, actions, table } = props;
  const classes = paperStylesTable();
  const isMobile = useMediaQuery('(max-width:1023px)');
  const [ selected, setSelected ] = React.useState([]);
  const cardTypes = (type, row, indx, handleSelected) => {
    const types = {
      loads: (
        <Grid item xs={12} key={indx} id={row.id}>
          <LoadCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
      users: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <UserCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
      brokers: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <BrokerCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
      invoices: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <InvoiceCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
      employees: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <EmployeeCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
      equipment: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx} id={row.id}>
          <EquipmentCard key={indx} data={row} isMobile={isMobile} selected={selected} setSelected={handleSelected}/>
        </Grid>),
    }
    return types[type] || 'No Card View!'
  }
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

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
            <EnhancedTableToolbar numSelected={selected.length} {...actions} selected={selected} setSelected={setSelected}/>
        </Grid>
      {rows && rows.length ? rows.map((row, indx) => {
        return cardTypes(table, row, indx, handleSelected)
      }) : ''}

     </Grid>
    </React.Fragment>
  )
}

CardView.propTypes = {
};

export default (CardView);
