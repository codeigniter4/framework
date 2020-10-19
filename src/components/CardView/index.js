import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ComplexCard from './Card';
import ListToolBar from '../ListToolBar';
import { paperStylesTable } from '../../styles/paper';

const CardView = (props) => {
  const { rows, actions } = props;
  const classes = paperStylesTable();
  const isMobile = useMediaQuery('(max-width:1023px)');

  return (
    <React.Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
            <ListToolBar actions={actions}/>
        </Grid>
      {rows && rows.length ? rows.map((row, indx) => {
        return (

            <Grid item xs={12}>
             <ComplexCard key={indx} data={row} isMobile={isMobile}/>
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
