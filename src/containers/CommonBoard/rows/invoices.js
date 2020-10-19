import React from 'react';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
const viewButton = (loadId, actions) => (<Link color="primary" href="#" onClick={(e) => actions.handleClick(e, loadId)}>Load Details</Link>);

export const getInvoiceRowData = (rows, actions, editButton) => {
  const formatProductServices = (records) => {
    const services = records.map(record => {
      return record.ProductService
    });
    return services.join(', ');
  }
  const newRows = [];
  const mappedInvoiceNo = [...rows].reduce((map, row) => {
    map[row['*InvoiceNo']] = map[row['*InvoiceNo']] ? [...map[row['*InvoiceNo']], row] : [row];
    return map
  },{});


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
    newRow['*DueDate'] = new Date(row['*DueDate']).toLocaleString();
    newRow.view = viewButton(row['*InvoiceNo'].split('-')[0], actions);
    return newRow;
  });
  return updateRowData;
}
