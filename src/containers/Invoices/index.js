import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListView from '../../components/ListView';
import AdminContextProvider from '../../contexts/AdminContext';
import { Button } from '@material-ui/core';
import { AdminContext } from '../../contexts/AdminContext';
import ListTable from '../../components/ListTable';
import ListToolBar from '../../components/ListToolBar';
import { invoiceColumns } from '../../constants/invoiceColumns';
import { INVOICE_MODEL } from '../../constants';
import { paperStylesTable } from '../../styles/paper';

const getRows = (rows, actions) => {
  const ids = {};
  const editButton = (id) => (
      <Button color="primary" onClick={() => actions.handleClick(id)}>Details</Button>
  );
  const mappedInvoiceNo = [...rows].reduce((map, row) => {
    map[row['*InvoiceNo']] = map[row['*InvoiceNo']] ? [...map[row['*InvoiceNo']], row] : [row];
    return map
  },{});

  const formatProductServices = (records) => {
    const services = records.map(record => {
      return record.ProductService
    });
    return services.join(', ');
  }
  const newRows = [];
  Object.keys(mappedInvoiceNo).map(id => {
    const productServices = formatProductServices(mappedInvoiceNo[id].reverse());
    const mergedRow = {
      ...mappedInvoiceNo[id][0],
      ProductService: productServices
    }
    newRows.push(mergedRow)
    return mergedRow
  })

  const updateRowData = newRows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id);
    newRow.ServiceDate = new Date(row.ServiceDate).toLocaleString();
    return newRow;
  });
  return updateRowData;
}


function Invoices(props) {
  const classes = paperStylesTable();
  const table = 'invoices';
  const { history } = props;
  return (
    <AdminContextProvider>
      <AdminContext.Consumer>{(context) => {
        const {records, filteredRecords, searchTerm, filterRecords, getAllRecords, deleteRecord, saveRecord, exportRecordToCSV } = context;
        const rows = searchTerm ? filteredRecords : [...records];
        const getInvoiceItemsWithIds = (ids) => {
          const idsToDelete = [];
          const invoiceId = [];
          ids.map(id => {
            records.filter(record => {
              if(record.id === id) {
                invoiceId.push(record['*InvoiceNo'])
              }
            })
          })
          invoiceId.map(id => {
            records.map(record => {
              if(record['*InvoiceNo'] === id) {
                idsToDelete.push(record.id)
              }
            })
          })
          return idsToDelete
        }

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
            const idsToDelete = getInvoiceItemsWithIds(ids);
            deleteRecord(table, idsToDelete);
            getAllRecords(table).then(data => {
              return data
            });
          },
          handleExport: (ids) => {
            const idsToExport = getInvoiceItemsWithIds(ids);
            const recordsToExport = records.filter(record => {
              return idsToExport.includes(record.id);
            }).reverse()
            exportRecordToCSV(table, recordsToExport).then(data => {
              console.log(data);
            }).catch(e => {
              console.log(e);
            })
          }
        };

        const updateRowData = rows.length ? getRows(rows, actions) : [];

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ListView history={history} actions={actions} rows={updateRowData} columns={invoiceColumns}/>
              </Paper>
            </Grid>
          </Grid>

        )
      }}
      </AdminContext.Consumer>
    </AdminContextProvider>
  )
}


export default Invoices;
