import React from 'react';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import ControlPanel from '../../../components/CardView/LoadCard/ControlPanel/';
const editBrokerButton = (loadId, brokerId, actions, name) => (<Link href="#" onClick={(e) => actions.handleBrokerClick(e, loadId, brokerId)}>{name}</Link>);
const addBrokerButton = (loadId, brokerId, actions, name) => (<Link href="#" style={{color:"#ff0303"}} onClick={(e) => actions.handleBrokerClick(e, loadId, brokerId)}>Add Broker!</Link>)

export const getLoadRowData = (context, rows, actions, editButton, tables) => {

  return rows.map(row => {
    const newRow = {...row};
    newRow.controlPanel = (<ControlPanel row={row} actions={actions}/>);
    newRow.editBroker = addBrokerButton(row.id, 'addNew', actions, 'Add');

    if(tables.brokers && tables.brokers.length) {
      tables.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.broker = broker.name;
          newRow.hasQuickPay = broker.quickPay !== "0" && broker.quickPay > 0;
          newRow.paymentTerms = broker.paymentTerms;
          newRow.editBroker = editBrokerButton(row.id, row.broker, actions, broker.name);
        }
        return broker
      })
    }

    if(tables.employees && tables.employees.length) {
      tables.employees.map(user => {
        if (user.id === row.user) {
          newRow.user = `${user.firstname} ${user.lastname}`
          newRow.driverName = `${user.firstname} ${user.lastname}`
          newRow.driverRate = user.compensation
          newRow.detentionPay = parseInt(user.detentionRate) * parseInt(row.detentionPay);
          newRow.layoverPay = parseInt(user.layoverRate) * parseInt(row.layoverPay);
        }
        return user
      })
    }

    if(tables.equipment && tables.equipment.length) {
      tables.equipment.map(tractor => {
        if (tractor.id === row.tractor) {
          newRow.unit_num = tractor.unit_num
        }
        return tractor
      })
    }


    newRow.rate = row.tonu === '1' ? 0 : row.rate;
    newRow.pickupDate = new Date(row.pickupDate).toLocaleString();
    newRow.dropoffDate = new Date(row.dropoffDate).toLocaleString();
    return newRow;
  })
}
