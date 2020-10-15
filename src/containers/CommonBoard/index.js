import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { AdminContext } from '../../contexts/AdminContext';
import { getColumnType } from './columns';
import { paperStylesTable } from '../../styles/paper';
import { getActions } from './actions';
import { getUpdatedRows } from './rows';



function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const position = match.params.position || false;
  const table = match.params.table;
  const tableType = position || table;
  const columnData = getColumnType(tableType);


  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const actions = getActions(context, table, position, history);
        const rows = getUpdatedRows(context, tableType, actions);

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {rows.length ?
                <Paper className={classes.paper}>
                  <ListView history={history} actions={actions} rows={rows} columns={columnData} order_by="name"/>
                </Paper>
              : ''}
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default CommonBoard;
