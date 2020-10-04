import React from 'react';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { dispatchColumns } from '../../constants/dispatchColumns';
import { DISPATCH_MODEL } from '../../constants';


function driverboard(props) {
  const table = 'employees';
  const type = 'dispatch';
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
            history.push(`/vgdt-admin/${type}/${id}`);
          },
          handleChange: (e) => {
            const fields = ['lastname', 'firstname'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: () => {
            saveRecord(table, DISPATCH_MODEL).then(data => {
              history.push(`/vgdt-admin/${type}/${data.id}`);
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
          <ListView history={history} actions={actions} rows={updateRowData} columns={dispatchColumns}/>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default driverboard;
