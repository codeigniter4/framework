import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { getColumnType } from '../../constants/columns';
import { EQUIPMENT_MODEL } from '../../constants';
import { paperStylesTable } from '../../styles/paper';
import { get, getType, getByID, save, deleteById, exportToCSV } from '../../services/';

function usePrevious(value) {
  const ref = React.useRef(value);
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function CommonBoard(props) {
  const classes = paperStylesTable();
  const { history, match } = props;
  const table = match.params.table;
  const columnData = getColumnType(table);
  const prevTable = usePrevious(table);


  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {tableData, setTableData, setTable, records, filteredRecords, searchTerm, filterRecords, getAllRecords, deleteRecord, saveRecord, setRecords } = context;
        const rows = searchTerm ? filteredRecords : tableData[table] || [];

        if(!tableData[table]){
          getAllRecords(table).then(data => {
            setTableData(table, data);
            return data
          });
        }



        const actions = {
          handleClick: (id) => {
            history.push(`/vgdt-admin/${table}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['username', 'name', 'type', 'unit_num', 'lastname', 'firstname', '*Customer', '*InvoiceNo', 'loadNumber', 'user', 'broker'];
            filterRecords(table, fields, e.target.value)
          },
          handleAdd: () => {
            // saveRecord(table, EQUIPMENT_MODEL).then(data => {
              history.push(`/vgdt-admin/${table}/add`);
            // })
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
          return newRow;
        })

        console.log('tableData: ', tableData)

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListView history={history} actions={actions} rows={updateRowData} columns={columnData}/>
              </Paper>
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default CommonBoard;
