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
import { paperStylesTable } from '../../styles/paper';

const CardView = (props) => {
  const { rows, actions, table } = props;
  const classes = paperStylesTable();
  const isMobile = useMediaQuery('(max-width:1023px)');
  const cardTypes = (type, row, indx) => {
    const types = {
      loads: (
        <Grid item xs={12} key={indx}>
          <LoadCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
      users: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
          <UserCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
      brokers: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
          <BrokerCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
      invoices: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
          <InvoiceCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
      employees: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
          <EmployeeCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
      equipment: (
        <Grid item xs={12} sm={6} md={6} lg={4} key={indx}>
          <EquipmentCard key={indx} data={row} isMobile={isMobile}/>
        </Grid>),
    }
    return types[type] || 'No Card View!'
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
        </Grid>
      {rows && rows.length ? rows.map((row, indx) => {
        return cardTypes(table, row, indx)
      }) : ''}

     </Grid>
    </React.Fragment>
  )
}

CardView.propTypes = {
};

export default (CardView);
