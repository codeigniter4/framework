import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { driverColumns } from '../../constants/driverColumns';
import { DRIVER_MODEL } from '../../constants';
import { paperStylesTable } from '../../styles/paper';


function driverboard(props) {
  const classes = paperStylesTable();
  const table = 'employees';
  const type = 'driver';
  const route = 'drivers';
  const { history } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {records, filteredRecords, searchTerm, filterRecords, getAllRecordsByType, deleteRecord, saveRecord } = context;
        const rows = searchTerm ? filteredRecords : [...records];

        if(!rows.length){
          getAllRecordsByType(table, type).then(data => {
            return data
          });
        }
        const actions = {
          handleClick: (id) => {
            history.push(`/vgdt-admin/${route}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['lastname', 'firstname'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: () => {
            saveRecord(table, DRIVER_MODEL).then(data => {
              history.push(`/vgdt-admin/${route}/${data.id}`);
            })
          },
          handleDelete: (ids) => {
            deleteRecord(table, ids);
            getAllRecordsByType(table, type).then(data => {
              return data
            });
          },
          handleExport: false
        }
        const editButton = (id) => (
            <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
        );

        const updateRowData = rows.map(row => {
          const newRow = {...row};
          newRow.edit = editButton(row.id);
          newRow.name = `${row.firstname} ${row.lastname}`;
          return newRow;
        })
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListView history={history} actions={actions} rows={updateRowData} columns={driverColumns}/>
              </Paper>
            </Grid>
          </Grid>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default driverboard;
