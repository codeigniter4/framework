import React from 'react';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
const editBrokerButton = (loadId, brokerId, actions, name) => (<Link href="#" onClick={(e) => actions.handleBrokerClick(e, loadId, brokerId)}>{name}</Link>);


export const getLoadRowData = (context, rows, actions, editButton) => {
  const { tableData } = context;

  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);
    newRow.editBroker = editBrokerButton(row.broker, actions, 'Create Broker');

    if(tableData.brokers && tableData.brokers.length) {
      tableData.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.broker = broker.name
          newRow.editBroker = editBrokerButton(row.id, row.broker, actions, broker.name);
        }
        return broker
      })
    }

    if(tableData.dispatch && tableData.dispatch.length) {
      tableData.dispatch.map(user => {
        if (user.id === row.user) {
          newRow.user = `${user.firstname} ${user.lastname}`
        }
        return user
      })
    }


    newRow.rate = row.tonu === '1' ? 'TONU' : row.rate;
    newRow.pickupDate = new Date(row.pickupDate).toLocaleString();
    newRow.dropoffDate = new Date(row.dropoffDate).toLocaleString();
    return newRow;
  })
}
