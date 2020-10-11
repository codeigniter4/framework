


export const getLoadActions = (context, table, history) => {
  const { record, saveRecord, setRecord, tableData } = context;
  return {
    handleSave: (record) => {
      saveRecord(table, record).then( data => {
        history.goBack();
        return data
      })
    },
    handleChange: (data, disabled, setdisabled) => {
      if(data.status && data.status === "Billed" && !disabled) {
        // const invoiceItems = generateInvoiceItems(load, broker);
        setRecord(table, data);
        setdisabled(true);
        console.log('generateInvoiceItems', data);
        // setinvoices(invoiceItems);
      }
    },
    handleBack: () => {
      history.goBack()
    },
    hasToggle: true
  }
}
