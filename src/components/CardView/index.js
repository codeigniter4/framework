import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ComplexCard from './Card';
import ListToolBar from '../ListToolBar';
import { paperStylesTable } from '../../styles/paper';

const CardView = (props) => {
  const { rows, actions } = props;
  const classes = paperStylesTable();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
        </Grid>
      {rows && rows.length ? rows.map((row, indx) => {
        return (

            <Grid item xs={12} sm={6} md={3}>
             <ComplexCard key={indx} data={row}/>
           </Grid>
        )
      }) : ''}

     </Grid>
    </React.Fragment>
  )
}

CardView.propTypes = {
};

export default (CardView);
