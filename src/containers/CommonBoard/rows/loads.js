export const getLoadRowData = (context, rows, actions, editButton) => {
  const { tableData } = context;

  return rows.map(row => {
    const newRow = {...row};
    newRow.edit = editButton(row.id, actions);

    if(tableData.brokers && tableData.brokers.length) {
      tableData.brokers.map(broker => {
        if (broker.id === row.broker) {
          newRow.broker = broker.name
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
