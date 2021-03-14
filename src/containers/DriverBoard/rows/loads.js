import React from 'react';
import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
const editBrokerButton = (loadId, brokerId, actions, name) => (<Link href="#" onClick={(e) => actions.handleBrokerClick(e, loadId, brokerId)}>{name}</Link>);
const addBrokerButton = (loadId, brokerId, actions, name) => (<Link href="#" style={{color:"#ff0303"}} onClick={(e) => actions.handleBrokerClick(e, loadId, brokerId)}>Add Broker!</Link>)
const generateInvoice = (loadId, actions) => (<Button color="secondary" size="small" variant="contained" onClick={() => actions.handleCreateInvoice([loadId], true)}>Generate Invoice</Button>)

export const getLoadRowData = (context, rows, actions, editButton) => {
  const { tableData } = context;

  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);
    newRow.editBroker = addBrokerButton(row.id, 'addNew', actions, 'Add');
    newRow.genInvoice = generateInvoice(row.id, actions);

    if(tableData.brokers && tableData.brokers.length) {
      tableData.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.broker = broker.name;
          newRow.hasQuickPay = broker.quickPay !== "0" && broker.quickPay > 0;
          newRow.paymentTerms = broker.paymentTerms;
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

    if(tableData.driver && tableData.driver.length) {
      tableData.driver.map(user => {
        if (user.id === row.driver) {
          newRow.driverName = `${user.firstname} ${user.lastname}`
          newRow.driverRate = user.compensation
          newRow.detentionPay = parseInt(user.detentionRate) * parseInt(row.detentionPay);
          newRow.layoverPay = parseInt(user.layoverRate) * parseInt(row.layoverPay);
          // newRow.breakdownRate = user.breakdownRate
        }
        return user
      })
    }

    if(tableData.tractor && tableData.tractor.length) {
      tableData.tractor.map(tractor => {
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
