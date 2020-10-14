import { generateInvoiceItems } from '../../../utils/generateInvoice'

export const getLoadsActions = (context, table, db, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData, brokers, loads, saveRecord } = context;
  const store = db || table;
  return {
      handleClick: (id) => {
        console.log('handleClick: ', id, history);
        history.push(`${store}/${id}`);
      },
      handleChange: (e) => {
        const fields = filterFields;
        filterRecords(table, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${store}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          setTableData(store, data);
        });
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const load = loads.filter(l => selected.includes(l.id))[0];
        const broker = brokers.filter(b => b.id === load.broker)[0];
        if(load && load.status === 'Billed') {
          if(isClicked) {
            const invoiceItems = generateInvoiceItems(load, broker);
            if(invoiceItems.length) {
              invoiceItems.map(invoice => {
                if (invoice) {
                  console.log('Billed invoice: ', invoice);
                  saveRecord('invoices', invoice);
                }
              })
            }
          }
          return true
        }

        // setinvoices(invoiceItems);
        return false
      }
    }
}
