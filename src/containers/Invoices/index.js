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
        const editButton = (id) => (
            <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
        );

        const ids = {};
        const updateRowData = [];
        rows.map(row => {
          ids[row['*InvoiceNo']] = ids[row['*InvoiceNo']] && ids[row['*InvoiceNo']].length ? ids[row['*InvoiceNo']] : []
          if(ids[row['*InvoiceNo']]) {
            ids[row['*InvoiceNo']].push(row);
          }
          const newRow = {...row};
          newRow.edit = editButton(row.id);
          newRow.ServiceDate = new Date(row.ServiceDate).toLocaleString();
          return newRow;
        })
        Object.keys(ids).map(id => {
          const productServices = [];
          ids[id].map((row, idx) => {
             productServices.push(ids[id][idx].ProductService)
          })

          ids[id][0].ProductService = productServices.join(', ')
          console.log('productServices: ', ids[id][0]);
          updateRowData.push(ids[id][0])
        })

        return (
          <ListView history={history} actions={actions} rows={updateRowData} columns={invoiceColumns}/>
        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Invoices;
