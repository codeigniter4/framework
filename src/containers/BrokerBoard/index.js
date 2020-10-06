import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { brokerColumns } from '../../constants/brokerColumns';
import { BROKER_MODEL } from '../../constants';
import { paperStylesTable } from '../../styles/paper';


function Brokerboard(props) {
  const classes = paperStylesTable();
  const table = 'brokers';
  const { history } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {records, filteredRecords, searchTerm, filterRecords, getAllRecords, deleteRecord, saveRecord } = context;
        const rows = searchTerm ? filteredRecords : [...records];

        if(!rows.length){
          getAllRecords(table).then(data => {
            return data
          });
        }
        const actions = {
          handleClick: (id) => {
            history.push(`/vgdt-admin/${table}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['name'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: () => {
            saveRecord(table, BROKER_MODEL).then(data => {
              history.push(`/vgdt-admin/${table}/${data.id}`);
            })
          },
          handleDelete: (ids) => {
            deleteRecord(table, ids);
            getAllRecords(table).then(data => {
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
          newRow.quickPay = row.quickPay === "0" ? "No" : "Yes"
          return newRow;
        })
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListView history={history} actions={actions} rows={updateRowData} columns={brokerColumns} order_by="name"/>
              </Paper>
            </Grid>
          </Grid>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Brokerboard;
