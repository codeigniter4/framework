import React from 'react';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
const viewLoadButton = (loadId, actions) => (<Link color="primary" href="#" onClick={(e) => actions.handleLoadClick(e, loadId)}>Load Details</Link>);
const viewBrokerButton = (brokerid, name, actions) => (<Link color="primary" href="#" onClick={(e) => actions.handleBrokerClick(e, brokerid)}>{name}</Link>);

export const getInvoiceRowData = (context, rows, actions, tables) => {
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
    // newRow.edit = editButton(row.id);
    newRow.ServiceDate = new Date(row.ServiceDate).toLocaleString();
    newRow['*DueDate'] = new Date(row['*DueDate']).toLocaleString();
    newRow.view = row['*InvoiceNo'] ? viewLoadButton(row['*InvoiceNo'].split('-')[0], actions) : false; // get load id
    newRow.billed = row.billed === "0" ? "No" : "Yes";

    if(tables.brokers && tables.brokers.length) {
      tables.brokers.map(broker => {
        if (broker.id === row.brokerid) {
          newRow.broker = viewBrokerButton(broker.id, broker.name, actions);
        }
        return newRow
      })
    }

    return newRow;
  });
  return updateRowData;
}
