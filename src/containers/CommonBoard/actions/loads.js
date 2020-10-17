import { generateInvoiceItems } from '../../../utils/generateInvoice'

export const getLoadsActions = (context, table, db, history, filterFields) => {
  const { deleteRecord, filterRecords, setTableData, brokers, loads, saveRecord, getRecord, getAllRecords } = context;
  const store = db || table;
  const refreshData = (store) => {
    getAllRecords(store).then(data => {
      setTableData(store, data);
      return data
    });
  }
  return {
      handleClick: (id) => {
        history.push(`${store}/${id}`);
      },
      handleBrokerClick: (e, loadId, brokerId) => {
        e.preventDefault();
        if(brokerId !== 'addNew'){
          history.push(`brokers/${brokerId}`);
        }else {
          history.push(`brokers/add/${store}/${loadId}`);
        }

      },
      handleChange: (e) => {
        e.preventDefault();
        const fields = filterFields;
        filterRecords(store, fields, e.target.value)
      },
      handleAdd: () => {
        history.push(`${store}/add`);
      },
      handleRefresh: false,
      handleDelete: (ids) => {
        deleteRecord(table, ids).then(data => {
          refreshData(store);
        });
      },
      handleExport: false,
      handleCreateInvoice: (selected, isClicked) => {
        const billed = selected.map(id => {
          const load = loads.filter(l => l.id === id)[0];
          const broker = brokers.filter(b => b.id === load.broker)[0];
          if(load && load.status === 'Completed' && load.broker !== 'addNew') {
            if(isClicked) {
              const invoiceItems = generateInvoiceItems(load, broker);
              if(invoiceItems.length) {
                invoiceItems.map(invoice => {
                  if (invoice) {
                    saveRecord('invoices', invoice).then(data => {
                      return data
                    });
                  }
                })
                // update load status
                getRecord(store, id).then(load => {
                  const updatedLoad = { ...load };
                  updatedLoad.status = "Billed";
                  saveRecord(store, updatedLoad).then(data => {
                    refreshData(store);
                    return data
                  })
                })
              }
            }
            return true
          }else {
            return false
          }
        })

        return !billed.includes(false)
      }
    }
}
