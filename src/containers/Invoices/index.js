import React from 'react';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { invoiceColumns } from '../../constants/invoiceColumns';
import { INVOICE_MODEL } from '../../constants';


function Invoices(props) {
  const table = 'invoices';
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
            const fields = ['*Customer', '*InvoiceNo'];
            filterRecords(fields, e.target.value)
          },
          handleAdd: false,
          handleDelete: (ids) => {
            deleteRecord(table, ids);
          }
        }
        // const editButton = (id) => (
        //     <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
        // );
        //
        // const updateRowData = rows.map(row => {
        //   const newRow = {...row};
        //   newRow.edit = editButton(row.id);
        //   return newRow;
        // })
        return (
          <ListView history={history} actions={actions} rows={rows} columns={invoiceColumns}/>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Invoices;
