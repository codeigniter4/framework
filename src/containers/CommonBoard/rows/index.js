import React from 'react';
import { Button } from '@material-ui/core';
import { getRowData } from './common';
import { getBrokerRowData } from './brokers';
import { getLoadRowData } from './loads';
import { getDriverRowData } from './driver';
import { getDispatchRowData } from './dispatch';
import { getInvoiceRowData } from './invoices';
import { getEquipmentRowData } from './equipment';
import { navigation } from '../../../components/Navigator/menuItems';

const tables = () => {
  return navigation.map(item => {
    return {
      route: item.route,
      name: item.type || item.table
    }
  })
}

const filterTables = (table) => tables().filter(item => {
  return item.name === table;
})

const getTableData = (context, table) => {
  const {tableData, setTableData, filteredRecords, searchTerm, getAllRecords } = context;
  const rows = searchTerm ? filteredRecords : tableData[table] || [];
  const requiredData = {
    loads: ['brokers', 'dispatch']
  }
  const refreshData = (route, name) => {
    getAllRecords(route).then(data => {
      setTableData(name, data);
      return data
    });
  }

  if(!tableData[table]){
    setTableData(table, []);
    tables().map(item => {
      if(item.name === table){
        refreshData(item.route, item.name);
      }
      return item
    })
    // ensures we get additional data for loads
    if(requiredData[table] && requiredData[table].length) {
      requiredData[table].map(item => {
        const data = filterTables(item);
        refreshData(data[0].route, data[0].name);
        return item
      })
    }
  }
  return rows
}


export const getUpdatedRows = (context, table, actions) => {
  const rows = getTableData(context, table);
  const editButton = (id, actions) => (<Button color="secondary" size="small" variant="contained" onClick={() => actions.handleClick(id)}>Details</Button>);
  const common = getRowData(rows, actions, editButton);
  const types = {
    brokers: () => getBrokerRowData(rows, actions, editButton),
    loads: () => getLoadRowData(context, rows, actions, editButton),
    driver: () => getDriverRowData(rows, actions, editButton),
    dispatch: () => getDispatchRowData(rows, actions, editButton),
    invoices: () => getInvoiceRowData(rows, actions, editButton),
    tractor: () => getEquipmentRowData(rows, actions, editButton),
    trailer: () => getEquipmentRowData(rows, actions, editButton),
    equipment: () => getEquipmentRowData(rows, actions, editButton),
    employees: () => getDriverRowData(rows, actions, editButton)
  }

  return types[table] ? types[table]() : common;
}
